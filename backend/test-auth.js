// Simple test script for authentication endpoints
// Run this after starting the server to test the API

const testAuth = async () => {
  // Get port from environment or use default
  const port = process.env.PORT || 3001;
  const baseURL = `http://localhost:${port}/api`;

  console.log("🧪 Testing Eventify Authentication API...\n");
  console.log(`🔗 Testing against: ${baseURL}\n`);

  // Test 1: Health Check
  try {
    console.log("1️⃣ Testing Health Check...");
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health Check:", healthData.message);
  } catch (error) {
    console.log("❌ Health Check Failed:", error.message);
    console.log("💡 Make sure the server is running with: npm run dev");
    return; // Stop testing if health check fails
  }

  // Test 2: Student Registration
  try {
    console.log("\n2️⃣ Testing Student Registration...");
    const studentData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@university.edu",
      password: "Student123",
      role: "student",
      studentId: "STU001",
      department: "Computer Science",
    };

    const registerResponse = await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    const registerResult = await registerResponse.json();

    if (registerResult.success) {
      console.log("✅ Student Registration:", registerResult.message);
      console.log("   User ID:", registerResult.data.user._id);
      console.log("   Role:", registerResult.data.user.role);
      console.log(
        "   Token received:",
        registerResult.data.token ? "Yes" : "No"
      );

      // Store token for later tests
      global.testToken = registerResult.data.token;
      global.testUserId = registerResult.data.user._id;
    } else {
      console.log("❌ Student Registration Failed:", registerResult.message);
      if (registerResult.errors) {
        registerResult.errors.forEach((error) => {
          console.log(`   - ${error.field}: ${error.message}`);
        });
      }
    }
  } catch (error) {
    console.log("❌ Student Registration Error:", error.message);
  }

  // Test 3: Club Admin Registration
  try {
    console.log("\n3️⃣ Testing Club Admin Registration...");
    const adminData = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@university.edu",
      password: "Admin123",
      role: "club_admin",
      clubName: "Tech Innovation Club",
      department: "Engineering",
    };

    const adminResponse = await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    const adminResult = await adminResponse.json();

    if (adminResult.success) {
      console.log("✅ Club Admin Registration:", adminResult.message);
      console.log("   User ID:", adminResult.data.user._id);
      console.log("   Role:", adminResult.data.user.role);
      console.log("   Club:", adminResult.data.user.clubName);
    } else {
      console.log("❌ Club Admin Registration Failed:", adminResult.message);
      if (adminResult.errors) {
        adminResult.errors.forEach((error) => {
          console.log(`   - ${error.field}: ${error.message}`);
        });
      }
    }
  } catch (error) {
    console.log("❌ Club Admin Registration Error:", error.message);
  }

  // Test 4: Login
  try {
    console.log("\n4️⃣ Testing Login...");
    const loginData = {
      email: "john.doe@university.edu",
      password: "Student123",
    };

    const loginResponse = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const loginResult = await loginResponse.json();

    if (loginResult.success) {
      console.log("✅ Login:", loginResult.message);
      console.log(
        "   User:",
        loginResult.data.user.firstName,
        loginResult.data.user.lastName
      );
      console.log("   Role:", loginResult.data.user.role);
      console.log("   Token received:", loginResult.data.token ? "Yes" : "No");
    } else {
      console.log("❌ Login Failed:", loginResult.message);
    }
  } catch (error) {
    console.log("❌ Login Error:", error.message);
  }

  // Test 5: Protected Route (Profile)
  if (global.testToken) {
    try {
      console.log("\n5️⃣ Testing Protected Route (Profile)...");
      const profileResponse = await fetch(`${baseURL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${global.testToken}`,
          "Content-Type": "application/json",
        },
      });

      const profileResult = await profileResponse.json();

      if (profileResult.success) {
        console.log("✅ Profile Access:", profileResult.message);
        console.log(
          "   User:",
          profileResult.data.user.firstName,
          profileResult.data.user.lastName
        );
        console.log("   Email:", profileResult.data.user.email);
        console.log("   Role:", profileResult.data.user.role);
      } else {
        console.log("❌ Profile Access Failed:", profileResult.message);
      }
    } catch (error) {
      console.log("❌ Profile Access Error:", error.message);
    }
  }

  // Test 6: Invalid Token
  try {
    console.log("\n6️⃣ Testing Invalid Token...");
    const invalidResponse = await fetch(`${baseURL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: "Bearer invalid_token_here",
        "Content-Type": "application/json",
      },
    });

    const invalidResult = await invalidResponse.json();

    if (!invalidResult.success) {
      console.log("✅ Invalid Token Rejected:", invalidResult.message);
    } else {
      console.log("❌ Invalid Token Should Have Been Rejected");
    }
  } catch (error) {
    console.log("❌ Invalid Token Test Error:", error.message);
  }

  console.log("\n🎉 Authentication API Testing Complete!");
  console.log("\n📝 Next Steps:");
  console.log("   1. Install dependencies: npm install");
  console.log("   2. Set up environment variables");
  console.log("   3. Start MongoDB");
  console.log("   4. Run: npm run dev");
  console.log("   5. Test with: node test-auth.js");
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAuth().catch(console.error);
}

module.exports = { testAuth };
