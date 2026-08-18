const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Config — load env FIRST before anything uses process.env
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      // Allow any Vercel domain and localhost
      const allowed = [
        /\.vercel\.app$/,
        /localhost/,
      ];
      if (allowed.some((pattern) => pattern.test(origin))) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use("/", express.static("uploads"));

// Route Imports
const user = require("./routes/userRoutes");
const shop = require("./routes/shopRoutes");
const product = require("./routes/productRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/order", order);
app.use("/api/v2/payment", payment);

// Middleware for Errors
app.use(ErrorHandler);

module.exports = app;
