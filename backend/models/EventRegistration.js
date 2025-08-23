const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"],
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ["registered", "cancelled", "attended", "no-show"],
        message: "Please select a valid status",
      },
      default: "registered",
    },
    attended: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique student-event combinations
eventRegistrationSchema.index({ event: 1, student: 1 }, { unique: true });

// Index for better query performance
eventRegistrationSchema.index({ student: 1, status: 1 });
eventRegistrationSchema.index({ event: 1, status: 1 });
eventRegistrationSchema.index({ registrationDate: 1 });

// Pre-save middleware to update event attendee count
eventRegistrationSchema.pre("save", async function (next) {
  try {
    const Event = mongoose.model("Event");
    
    if (this.isNew) {
      // New registration - increment attendee count
      await Event.findByIdAndUpdate(this.event, {
        $inc: { currentAttendees: 1 },
      });
    } else if (this.isModified("status")) {
      // Status changed - handle attendee count updates
      const oldDoc = await this.constructor.findById(this._id);
      if (oldDoc) {
        if (oldDoc.status === "registered" && this.status === "cancelled") {
          // Cancelled registration - decrement attendee count
          await Event.findByIdAndUpdate(this.event, {
            $inc: { currentAttendees: -1 },
          });
        } else if (oldDoc.status === "cancelled" && this.status === "registered") {
          // Re-registered - increment attendee count
          await Event.findByIdAndUpdate(this.event, {
            $inc: { currentAttendees: 1 },
          });
        }
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-remove middleware to update event attendee count
eventRegistrationSchema.pre("remove", async function (next) {
  try {
    const Event = mongoose.model("Event");
    
    // Only decrement if status was registered
    if (this.status === "registered") {
      await Event.findByIdAndUpdate(this.event, {
        $inc: { currentAttendees: -1 },
      });
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);
