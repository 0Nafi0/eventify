const Club = require("../models/Club");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Get all available clubs
exports.getAvailableClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .select("name description members")
      .lean()
      .exec();

    // Add memberCount to each club
    const clubsWithCount = clubs.map((club) => ({
      ...club,
      memberCount: club.members.length,
    }));

    res.json({ success: true, clubs: clubsWithCount });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching clubs",
      error: error.message,
    });
  }
};

// Get user's clubs
exports.getUserClubs = async (req, res) => {
  try {
    const clubs = await Club.find({
      members: req.user._id,
    })
      .select("name description members")
      .lean()
      .exec();

    // Add memberCount to each club
    const clubsWithCount = clubs.map((club) => ({
      ...club,
      memberCount: club.members.length,
    }));

    res.json({ success: true, clubs: clubsWithCount });
  } catch (error) {
    console.error("Error fetching user clubs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user clubs",
      error: error.message,
    });
  }
};

// Join a club
exports.joinClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const userId = req.user._id;

    // Check if club exists
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    // Check if user is already a member
    if (club.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this club",
      });
    }

    // Add user to club members
    club.members.push(userId);
    await club.save();

    res.json({
      success: true,
      message: "Successfully joined the club",
      club: {
        _id: club._id,
        name: club.name,
        memberCount: club.members.length,
      },
    });
  } catch (error) {
    console.error("Error joining club:", error);
    res.status(500).json({
      success: false,
      message: "Error joining club",
      error: error.message,
    });
  }
};

// Leave a club
exports.leaveClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const userId = req.user._id;

    // Check if club exists
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    // Check if user is a member
    if (!club.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this club",
      });
    }

    // Remove user from club members
    club.members = club.members.filter(
      (memberId) => memberId.toString() !== userId.toString()
    );
    await club.save();

    res.json({
      success: true,
      message: "Successfully left the club",
    });
  } catch (error) {
    console.error("Error leaving club:", error);
    res.status(500).json({
      success: false,
      message: "Error leaving club",
      error: error.message,
    });
  }
};

// Create a new club (admin only)
exports.createClub = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only administrators can create clubs",
      });
    }

    const { name, description } = req.body;

    // Check if club already exists
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({
        success: false,
        message: "A club with this name already exists",
      });
    }

    // Create new club
    const club = new Club({
      name,
      description,
      leaders: [req.user._id],
    });

    await club.save();

    res.status(201).json({
      success: true,
      message: "Club created successfully",
      club,
    });
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({
      success: false,
      message: "Error creating club",
      error: error.message,
    });
  }
};
