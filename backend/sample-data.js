const mongoose = require("mongoose");
const Event = require("./models/Event");
const User = require("./models/User");
require("dotenv").config();

const sampleEvents = [
  {
    title: "Tech Innovation Workshop",
    description:
      "Join us for an exciting workshop on emerging technologies including AI, blockchain, and IoT. Learn from industry experts and get hands-on experience with cutting-edge tools.",
    date: new Date("2025-02-15"),
    startTime: "10:00",
    endTime: "16:00",
    location: "Engineering Building, Room 101",
    maxAttendees: 50,
    currentAttendees: 0,
    category: "technical",
    image: null,
    isActive: true,
    registrationDeadline: new Date("2025-02-10"),
    clubName: "Tech Innovation Club",
    department: "Engineering",
    tags: ["AI", "Blockchain", "IoT", "Workshop"],
    requirements: "Basic programming knowledge recommended",
    contactInfo: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1-555-0123",
    },
  },
  {
    title: "Cultural Diversity Festival",
    description:
      "Celebrate the rich cultural diversity of our university community. Enjoy traditional music, dance performances, food tastings, and cultural exhibitions.",
    date: new Date("2025-02-20"),
    startTime: "14:00",
    endTime: "20:00",
    location: "Student Center Plaza",
    maxAttendees: 200,
    currentAttendees: 0,
    category: "cultural",
    image: null,
    isActive: true,
    registrationDeadline: new Date("2025-02-18"),
    clubName: "Cultural Exchange Society",
    department: "Arts & Humanities",
    tags: ["Culture", "Diversity", "Festival", "Music", "Dance"],
    requirements: "Open to all students",
    contactInfo: {
      name: "Maria Rodriguez",
      email: "maria.rodriguez@university.edu",
      phone: "+1-555-0124",
    },
  },
  {
    title: "Academic Writing Seminar",
    description:
      "Improve your academic writing skills with this comprehensive seminar. Learn about research methodology, citation styles, and effective writing techniques.",
    date: new Date("2025-02-25"),
    startTime: "13:00",
    endTime: "15:00",
    location: "Library Conference Room",
    maxAttendees: 30,
    currentAttendees: 0,
    category: "academic",
    image: null,
    isActive: true,
    registrationDeadline: new Date("2025-02-23"),
    clubName: "Academic Excellence Club",
    department: "Education",
    tags: ["Writing", "Research", "Academic", "Seminar"],
    requirements: "Open to all students",
    contactInfo: {
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      phone: "+1-555-0125",
    },
  },
  {
    title: "Basketball Tournament",
    description:
      "Annual inter-department basketball tournament. Form teams and compete for the championship trophy. All skill levels welcome!",
    date: new Date("2025-03-01"),
    startTime: "09:00",
    endTime: "18:00",
    location: "University Sports Complex",
    maxAttendees: 100,
    currentAttendees: 0,
    category: "sports",
    image: null,
    isActive: true,
    registrationDeadline: new Date("2025-02-28"),
    clubName: "Sports & Recreation Club",
    department: "Physical Education",
    tags: ["Basketball", "Tournament", "Sports", "Competition"],
    requirements: "Basic basketball skills",
    contactInfo: {
      name: "Coach David Wilson",
      email: "david.wilson@university.edu",
      phone: "+1-555-0126",
    },
  },
  {
    title: "Startup Pitch Competition",
    description:
      "Present your innovative business ideas to a panel of judges including successful entrepreneurs and investors. Win prizes and mentorship opportunities.",
    date: new Date("2025-03-05"),
    startTime: "16:00",
    endTime: "20:00",
    location: "Business School Auditorium",
    maxAttendees: 80,
    currentAttendees: 0,
    category: "workshop",
    image: null,
    isActive: true,
    registrationDeadline: new Date("2025-03-03"),
    clubName: "Entrepreneurship Club",
    department: "Business",
    tags: ["Startup", "Pitch", "Entrepreneurship", "Business"],
    requirements: "Business idea or concept required",
    contactInfo: {
      name: "Dr. Emily Thompson",
      email: "emily.thompson@university.edu",
      phone: "+1-555-0127",
    },
  },
  {
    title: "Environmental Awareness Day",
    description:
      "Learn about environmental conservation, sustainability practices, and climate change. Participate in tree planting and eco-friendly activities.",
    date: new Date("2025-03-10"),
    startTime: "10:00",
    endTime: "16:00",
    location: "University Park",
    maxAttendees: 150,
    currentAttendees: 0,
    category: "social",
    image: null,
    isActive: true,
    registrationDeadline: new Date("2025-03-08"),
    clubName: "Environmental Club",
    department: "Environmental Science",
    tags: ["Environment", "Sustainability", "Climate Change", "Conservation"],
    requirements: "Open to all students",
    contactInfo: {
      name: "Dr. James Green",
      email: "james.green@university.edu",
      phone: "+1-555-0128",
    },
  },
];

const createSampleData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if events already exist
    const existingEvents = await Event.countDocuments();
    if (existingEvents > 0) {
      console.log(
        "⚠️  Events already exist in database. Skipping sample data creation."
      );
      return;
    }

    // Create a sample club admin user if it doesn't exist
    let clubAdmin = await User.findOne({ role: "club_admin" });
    if (!clubAdmin) {
      console.log(
        "⚠️  No club admin found. Please create a club admin user first."
      );
      return;
    }

    // Create sample events
    const eventsWithCreator = sampleEvents.map((event) => ({
      ...event,
      createdBy: clubAdmin._id,
    }));

    const createdEvents = await Event.insertMany(eventsWithCreator);
    console.log(`✅ Created ${createdEvents.length} sample events`);

    // Display created events
    createdEvents.forEach((event) => {
      console.log(`   - ${event.title} (${event.category})`);
    });

    console.log("\n🎉 Sample data creation completed successfully!");
    console.log("💡 You can now test the student features with these events.");
  } catch (error) {
    console.error("❌ Error creating sample data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Run the script if called directly
if (require.main === module) {
  createSampleData();
}

module.exports = { createSampleData };
