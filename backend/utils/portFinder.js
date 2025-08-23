const net = require('net');

/**
 * Find an available port starting from the given port
 * @param {number} startPort - The port to start checking from
 * @param {number} maxAttempts - Maximum number of ports to check
 * @returns {Promise<number>} - Available port number
 */
const findAvailablePort = (startPort = 3001, maxAttempts = 100) => {
  return new Promise((resolve, reject) => {
    let currentPort = startPort;
    let attempts = 0;

    const tryPort = (port) => {
      const server = net.createServer();
      
      server.listen(port, () => {
        server.once('close', () => {
          resolve(port);
        });
        server.close();
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
          attempts++;
          if (attempts >= maxAttempts) {
            reject(new Error(`Could not find available port after ${maxAttempts} attempts`));
            return;
          }
          tryPort(port + 1);
        } else {
          reject(err);
        }
      });
    };

    tryPort(currentPort);
  });
};

module.exports = { findAvailablePort };
