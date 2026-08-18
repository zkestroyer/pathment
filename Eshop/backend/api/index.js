const app = require("../app");
const connectDatabase = require("../config/database");

// Connect to database on first invocation
let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }
  return app(req, res);
};
