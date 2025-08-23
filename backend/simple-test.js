// Simple test script to verify server connectivity
const testServer = async () => {
  const port = process.env.PORT || 3001;
  const baseURL = `http://localhost:${port}/api`;

  console.log(`🧪 Testing server connectivity...`);
  console.log(`🔗 Server URL: ${baseURL}`);
  console.log(`📡 Port: ${port}\n`);

  try {
    // Test 1: Basic connectivity
    console.log("1️⃣ Testing basic connectivity...");
    const response = await fetch(`${baseURL}/health`);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Server is running!");
      console.log("   Status:", response.status);
      console.log("   Message:", data.message);
    } else {
      console.log("❌ Server responded with error:", response.status);
    }
  } catch (error) {
    console.log("❌ Connection failed:", error.message);
    console.log("\n💡 Troubleshooting:");
    console.log("   1. Make sure the server is running: npm run dev");
    console.log("   2. Check if port 3001 is available");
    console.log("   3. Verify MongoDB is running");
    console.log("   4. Check the server console for errors");
  }
};

// Run the test
testServer().catch(console.error);
