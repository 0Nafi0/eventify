const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const { validationResult } = require("express-validator");

// @desc    Get all upcoming events (for students)
// @route   GET /api/events
// @access  Public
const getUpcomingEvents = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    // Build query for upcoming events
    const query = {
      isActive: true,
      date: { $gte: new Date() },
      registrationDeadline: { $gte: new Date() },
    };

    // Add category filter if provided
    if (category && category !== "all") {
      query.category = category;
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { clubName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get events with pagination
    const events = await Event.find(query)
      .populate("createdBy", "firstName lastName email")
      .sort({ date: 1, startTime: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    // Add virtual fields
    const eventsWithVirtuals = events.map((event) => ({
      ...event,
      isFull: event.currentAttendees >= event.maxAttendees,
      isRegistrationOpen: new Date() < new Date(event.registrationDeadline),
      isUpcoming: new Date() < new Date(event.date),
    }));

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: {
        events: eventsWithVirtuals,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalEvents: total,
          hasNextPage: skip + events.length < total,
          hasPrevPage: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error getting upcoming events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve events",
      error: error.message,
    });
  }
};

// @desc    Get event by ID with registration status
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id; // Optional - for logged-in users

    const event = await Event.findById(id)
      .populate("createdBy", "firstName lastName email")
      .lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (!event.isActive) {
      return res.status(400).json({
        success: false,
        message: "Event is not active",
      });
    }

    // Add virtual fields
    const eventWithVirtuals = { ...event,
      isFull: event.currentAttendees >= event.maxAttendees,
      isRegistrationOpen: new Date() < new Date(event.registrationDeadline),
      isUpcoming: new Date() < new Date(event.date),
    };

    // If user is logged in, check registration status
    if (userId) {
      const registration = await EventRegistration.findOne({
        event: id,
        student: userId,
        status: { $in: ["registered", "attended"] },
      });

      eventWithVirtuals.userRegistration = registration ?
        {
          id: registration._id,
          status: registration.status,
          registrationDate: registration.registrationDate,
          attended: registration.attended,
        } :
        null;
    }

    res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      data: { event: eventWithVirtuals },
    });
  } catch (error) {
    console.error("Error getting event by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve event",
      error: error.message,
    });
  }
};

// @desc    Register student for an event
// @route   POST /api/events/:id/register
// @access  Private (Students only)
const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    // Check if user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can register for events",
      });
    }

    // Check if event exists and is active
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (!event.isActive) {
      return res.status(400).json({
        success: false,
        message: "Event is not active",
      });
    }

    // Check if event is full
    if (event.currentAttendees >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: "Event is full",
      });
    }

    // Check if registration deadline has passed
    if (new Date() >= event.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline has passed",
      });
    }

    // Check if student is already registered
    const existingRegistration = await EventRegistration.findOne({
      event: id,
      student: studentId,
    });

    if (existingRegistration) {
      if (existingRegistration.status === "registered") {
        return res.status(400).json({
          success: false,
          message: "You are already registered for this event",
        });
      } else if (existingRegistration.status === "cancelled") {
        // Re-register if previously cancelled
        existingRegistration.status = "registered";
        await existingRegistration.save();

        return res.status(200).json({
          success: true,
          message: "Successfully re-registered for the event",
          data: { registration: existingRegistration },
        });
      }
    }

    // Create new registration
    const registration = new EventRegistration({
      event: id,
      student: studentId,
      status: "registered",
    });

    await registration.save();

    // Populate event details
    await registration.populate(
      "event",
      "title date startTime endTime location"
    );

    res.status(201).json({
      success: true,
      message: "Successfully registered for the event",
      data: { registration },
    });
  } catch (error) {
    console.error("Error registering for event:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to register for event",
      error: error.message,
    });
  }
};

// @desc    Unregister student from an event
// @route   DELETE /api/events/:id/register
// @access  Private (Students only)
const unregisterFromEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    // Check if user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can unregister from events",
      });
    }

    // Check if event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Find registration
    const registration = await EventRegistration.findOne({
      event: id,
      student: studentId,
      status: "registered",
    });

    if (!registration) {
      return res.status(400).json({
        success: false,
        message: "You are not registered for this event",
      });
    }

    // Check if event has already started
    if (new Date() >= event.date) {
      return res.status(400).json({
        success: false,
        message: "Cannot unregister from an event that has already started",
      });
    }

    // Cancel registration
    registration.status = "cancelled";
    await registration.save();

    res.status(200).json({
      success: true,
      message: "Successfully unregistered from the event",
      data: { registration },
    });
  } catch (error) {
    console.error("Error unregistering from event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unregister from event",
      error: error.message,
    });
  }
};

// @desc    Get student's registered events
// @route   GET /api/events/student/registered
// @access  Private (Students only)
const getStudentRegisteredEvents = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { page = 1, limit = 10, status = "all" } = req.query;

    // Check if user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can view their registered events",
      });
    }

    // Build query
    const query = { student: studentId };
    if (status !== "all") {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get registrations with event details
    const registrations = await EventRegistration.find(query)
      .populate({
        path: "event",
        select:
          "title description date startTime endTime location category clubName image isActive registrationDeadline",
      })
      .sort({ "event.date": 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await EventRegistration.countDocuments(query);

    // Add virtual fields to events
    const registrationsWithVirtuals = registrations.map((reg) => ({
      ...reg,
      event: {
        ...reg.event,
        isFull: reg.event.currentAttendees >= reg.event.maxAttendees,
        isRegistrationOpen:
          new Date() < new Date(reg.event.registrationDeadline),
        isUpcoming: new Date() < new Date(reg.event.date),
      },
    }));

    res.status(200).json({
      success: true,
      message: "Registered events retrieved successfully",
      data: {
        registrations: registrationsWithVirtuals,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalRegistrations: total,
          hasNextPage: skip + registrations.length < total,
          hasPrevPage: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error getting student registered events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve registered events",
      error: error.message,
    });
  }
};

// @desc    Create a new event
// @route   POST /api/events/admin
// @access  Private (Club Admins only)
const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      maxAttendees,
      category,
      registrationDeadline,
      tags,
      requirements,
      contactInfo,
      image,
    } = req.body;

    const event = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      maxAttendees,
      category,
      registrationDeadline,
      tags,
      requirements,
      contactInfo,
      image,
      createdBy: req.user._id,
      clubName: req.user.clubName,
      department: req.user.department,
    });

    const createdEvent = await event.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: createdEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// @desc    Update an event
// @route   PUT /api/events/admin/:id
// // @access  Private (Club Admins only)
const updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to update this event",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// @desc    Delete an event (soft delete)
// @route   DELETE /api/events/admin/:id
// @access  Private (Club Admins only)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to delete this event",
      });
    }

    // Soft delete by setting isActive to false
    event.isActive = false;
    await event.save();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

// @desc    Get events for a specific club admin
// @route   GET /api/events/admin/my-events
// @access  Private (Club Admins only)
const getClubAdminEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "Admin events retrieved successfully",
      data: {
        events,
      },
    });
  } catch (error) {
    console.error("Error getting admin events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin events",
      error: error.message,
    });
  }
};

// @desc    Get attendees for an event
// @route   GET /api/events/admin/:id/attendees
// @access  Private (Club Admins only)
const getEventAttendees = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to view attendees for this event",
      });
    }

    const registrations = await EventRegistration.find({ event: id, status: 'registered' })
      .populate('student', 'firstName lastName email studentId department');

    res.status(200).json({
      success: true,
      message: "Attendees retrieved successfully",
      data: {
        attendees: registrations,
      },
    });
  } catch (error) {
    console.error("Error getting event attendees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve event attendees",
      error: error.message,
    });
  }
};

module.exports = {
  getUpcomingEvents,
  getEventById,
  registerForEvent,
  unregisterFromEvent,
  getStudentRegisteredEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getClubAdminEvents,
  getEventAttendees,
};