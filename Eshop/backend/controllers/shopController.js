const Shop = require("../models/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendShopToken } = require("../utils/jwtToken");

// Register a Shop
exports.registerShop = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, address, phoneNumber, zipCode } = req.body;

  if (!name || !email || !password || !address || !phoneNumber || !zipCode) {
    return next(new ErrorHandler("Please enter all details", 400));
  }

  const shopExists = await Shop.findOne({ email });

  if (shopExists) {
    return next(new ErrorHandler("Shop already exists with this email", 400));
  }

  const shop = await Shop.create({
    name,
    email,
    password,
    address,
    phoneNumber,
    zipCode,
    avatar: {
      public_id: "default_avatar",
      url: "https://www.gravatar.com/avatar/?d=identicon",
    },
  });

  sendShopToken(shop, 201, res);
});

// Login Shop
exports.loginShop = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Finding shop and selecting password manually since it's select: false in schema
  const shop = await Shop.findOne({ email }).select("+password");

  if (!shop) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await shop.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendShopToken(shop, 200, res);
});

// Load Logged in Shop Profile
exports.getShopProfile = catchAsyncErrors(async (req, res, next) => {
  const shop = await Shop.findById(req.seller.id);

  if (!shop) {
    return next(new ErrorHandler("Shop not found", 404));
  }

  res.status(200).json({
    success: true,
    shop,
  });
});

// Logout Shop
exports.logoutShop = catchAsyncErrors(async (req, res, next) => {
  res.cookie("seller_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
