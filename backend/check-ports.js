#!/usr/bin/env node

const net = require("net");

/**
 * Check if a port is available
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>} - True if port is available
 */
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.listen(port, () => {
      server.once("close", () => {
        resolve(true);
      });
      server.close();
    });

    server.on("error", () => {
      resolve(false);
    });
  });
};

/**
 * Find available ports in a range
 * @param {number} startPort - Starting port number
 * @param {number} endPort - Ending port number
 * @returns {Promise<number[]>} - Array of available ports
 */
const findAvailablePorts = async (startPort = 3000, endPort = 3010) => {
  const availablePorts = [];

  for (let port = startPort; port <= endPort; port++) {
    if (await isPortAvailable(port)) {
      availablePorts.push(port);
    }
  }

  return availablePorts;
};

/**
 * Main function to check ports
 */
const main = async () => {
  console.log("🔍 Checking port availability...\n");

  // Check common development ports
  const commonPorts = [3000, 3001, 5000, 8000, 8080];

  console.log("📋 Common development ports:");
  for (const port of commonPorts) {
    const available = await isPortAvailable(port);
    const status = available ? "✅ Available" : "❌ In Use";
    console.log(`   Port ${port}: ${status}`);
  }

  console.log("\n🔍 Finding available ports in range 3000-3010:");
  const availablePorts = await findAvailablePorts(3000, 3010);

  if (availablePorts.length > 0) {
    console.log("✅ Available ports:");
    availablePorts.forEach((port) => {
      console.log(`   - Port ${port}`);
    });

    console.log(`\n💡 Recommended port: ${availablePorts[0]}`);
    console.log(`   Add this to your .env file: PORT=${availablePorts[0]}`);
  } else {
    console.log("❌ No available ports found in range 3000-3010");
    console.log("💡 Try checking a different range or stop other services");
  }

  console.log("\n📝 Troubleshooting tips:");
  console.log("   1. Check if other services are running on the same port");
  console.log("   2. Try using a different port in your .env file");
  console.log("   3. Restart your terminal/command prompt");
  console.log("   4. Check Windows Firewall settings");
  console.log("   5. Run as Administrator if needed");
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { isPortAvailable, findAvailablePorts };
