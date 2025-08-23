#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Setting up Eventify Backend...\n");

// Check if package.json exists
if (!fs.existsSync("package.json")) {
  console.log(
    "❌ package.json not found. Please run this script from the backend directory."
  );
  process.exit(1);
}

// Check if .env exists, if not create from example
if (!fs.existsSync(".env")) {
  if (fs.existsSync("env.example")) {
    console.log("📝 Creating .env file from env.example...");
    fs.copyFileSync("env.example", ".env");
    console.log("✅ .env file created successfully!");
    console.log(
      "⚠️  Please update the JWT_SECRET in .env with a secure value.\n"
    );
  } else {
    console.log(
      "❌ env.example not found. Please create a .env file manually."
    );
  }
} else {
  console.log("✅ .env file already exists.");
}

// Install dependencies
console.log("📦 Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Dependencies installed successfully!\n");
} catch (error) {
  console.log(
    '❌ Failed to install dependencies. Please run "npm install" manually.\n'
  );
}

// Check if MongoDB is running
console.log("🔍 Checking MongoDB connection...");
try {
  // Try to connect to MongoDB (this will fail if MongoDB is not running)
  const mongoose = require("mongoose");
  mongoose
    .connect("mongodb://localhost:27017/test", {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("✅ MongoDB is running and accessible.");
      mongoose.disconnect();
    })
    .catch(() => {
      console.log("❌ MongoDB is not running or not accessible.");
      console.log("   Please start MongoDB and try again.");
    });
} catch (error) {
  console.log("❌ Could not check MongoDB connection.");
}

console.log("\n🎉 Setup complete!");
console.log("\n📋 Next steps:");
console.log("   1. Update .env file with your configuration");
console.log("   2. Ensure MongoDB is running");
console.log("   3. Start the server: npm run dev");
console.log("   4. Test the API: node test-auth.js");
console.log("\n📚 For more information, see README.md");
