const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Shop = require("../models/Shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found or token invalid", 401));
  }

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login as seller to access this resource", 401));
  }

  const decodedData = jwt.verify(seller_token, process.env.JWT_SECRET);
  req.seller = await Shop.findById(decodedData.id);

  if (!req.seller) {
    return next(new ErrorHandler("Seller not found or token invalid", 401));
  }

  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 403)
      );
    }
    next();
  };
};
