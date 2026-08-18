const mongoose = require("mongoose");

// Cache the connection promise across serverless invocations
let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DB_URL, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((mongoose) => {
        console.log(`Mongodb connected with server: ${mongoose.connection.host}`);
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDatabase;
