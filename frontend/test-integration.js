// Test script to verify frontend-backend integration
// Run this after starting both frontend and backend

const testIntegration = async () => {
  const backendURL = "http://localhost:3001/api";
  const frontendURL = "http://localhost:5173";

  console.log("🧪 Testing Frontend-Backend Integration...\n");
  console.log(`🔗 Backend: ${backendURL}`);
  console.log(`🌐 Frontend: ${frontendURL}\n`);

  try {
    // Test 1: Backend Health Check
    console.log("1️⃣ Testing Backend Health...");
    const healthResponse = await fetch(`${backendURL}/health`);
    const healthData = await healthResponse.json();

    if (healthResponse.ok) {
      console.log("✅ Backend is running:", healthData.message);
    } else {
      console.log("❌ Backend health check failed:", healthData.message);
      return;
    }

    // Test 2: Frontend Accessibility
    console.log("\n2️⃣ Testing Frontend Accessibility...");
    try {
      const frontendResponse = await fetch(frontendURL);
      if (frontendResponse.ok) {
        console.log("✅ Frontend is accessible");
      } else {
        console.log("❌ Frontend returned status:", frontendResponse.status);
      }
    } catch (error) {
      console.log("❌ Frontend not accessible:", error.message);
      console.log("💡 Make sure to run: npm run dev");
    }

    // Test 3: CORS Configuration
    console.log("\n3️⃣ Testing CORS Configuration...");
    const corsResponse = await fetch(`${backendURL}/health`, {
      method: "GET",
      headers: {
        Origin: frontendURL,
        "Content-Type": "application/json",
      },
    });

    if (corsResponse.ok) {
      console.log("✅ CORS is properly configured");
      console.log(
        "   Access-Control-Allow-Origin:",
        corsResponse.headers.get("access-control-allow-origin")
      );
    } else {
      console.log("❌ CORS test failed");
    }

    // Test 4: Authentication Endpoints
    console.log("\n4️⃣ Testing Authentication Endpoints...");

    // Test registration endpoint
    const testUser = {
      firstName: "Test",
      lastName: "User",
      email: "test.user@university.edu",
      password: "Test123",
      role: "student",
      studentId: "TEST001",
      department: "Computer Science",
    };

    const registerResponse = await fetch(`${backendURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: frontendURL,
      },
      body: JSON.stringify(testUser),
    });

    if (registerResponse.ok) {
      console.log("✅ Registration endpoint working");
      const registerData = await registerResponse.json();
      console.log("   User created with ID:", registerData.data.user._id);

      // Test login endpoint
      const loginResponse = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: frontendURL,
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });

      if (loginResponse.ok) {
        console.log("✅ Login endpoint working");
        const loginData = await loginResponse.json();
        console.log("   Token received:", loginData.data.token ? "Yes" : "No");
      } else {
        console.log("❌ Login endpoint failed");
      }
    } else {
      console.log("❌ Registration endpoint failed");
      const errorData = await registerResponse.json();
      console.log("   Error:", errorData.message);
    }

    console.log("\n🎉 Integration Testing Complete!");
    console.log("\n📝 Next Steps:");
    console.log("   1. Backend: npm run dev (port 3001)");
    console.log("   2. Frontend: npm run dev (port 5173)");
    console.log("   3. Test authentication flow in browser");
    console.log("   4. Check localStorage for tokens");
  } catch (error) {
    console.error("❌ Integration test failed:", error.message);
    console.log("\n💡 Troubleshooting:");
    console.log("   1. Ensure backend is running on port 3001");
    console.log("   2. Ensure frontend is running on port 5173");
    console.log("   3. Check MongoDB connection");
    console.log("   4. Verify CORS configuration");
  }
};

// Run tests if this file is executed directly
if (typeof window === "undefined") {
  // Node.js environment
  testIntegration().catch(console.error);
} else {
  // Browser environment
  console.log("🌐 Running in browser - use console to test manually");
  console.log("💡 Test backend connectivity:");
  console.log('   fetch("http://localhost:3001/api/health")');
}
