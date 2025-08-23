const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Event title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [1000, "Event description cannot exceed 1000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Event start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "Event end time is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    maxAttendees: {
      type: Number,
      required: [true, "Maximum attendees is required"],
      min: [1, "Maximum attendees must be at least 1"],
    },
    currentAttendees: {
      type: Number,
      default: 0,
      min: [0, "Current attendees cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: {
        values: [
          "academic",
          "social",
          "sports",
          "cultural",
          "technical",
          "workshop",
          "seminar",
          "other",
        ],
        message: "Please select a valid category",
      },
    },
    image: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    registrationDeadline: {
      type: Date,
      required: [true, "Registration deadline is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event creator is required"],
    },
    clubName: {
      type: String,
      required: [true, "Club name is required"],
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    requirements: {
      type: String,
      trim: true,
      maxlength: [500, "Requirements cannot exceed 500 characters"],
    },
    contactInfo: {
      name: String,
      email: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ category: 1, isActive: 1 });
eventSchema.index({ createdBy: 1 });
eventSchema.index({ clubName: 1 });

// Virtual for checking if event is full
eventSchema.virtual("isFull").get(function () {
  return this.currentAttendees >= this.maxAttendees;
});

// Virtual for checking if registration is open
eventSchema.virtual("isRegistrationOpen").get(function () {
  return new Date() < this.registrationDeadline;
});

// Virtual for checking if event is upcoming
eventSchema.virtual("isUpcoming").get(function () {
  return new Date() < this.date;
});

// Ensure virtuals are serialized
eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Event", eventSchema);
