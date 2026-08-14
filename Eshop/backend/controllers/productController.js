const Product = require("../models/Product");
const Shop = require("../models/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.seller.id;
    const shop = await Shop.findById(shopId);
    
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    }

    const productData = req.body;
    productData.shopId = shopId;
    
    // In a full implementation, Cloudinary upload logic would process req.body.images
    if(!productData.images || productData.images.length === 0){
        productData.images = [{ public_id: "demo", url: "https://via.placeholder.com/150" }];
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get all products of a shop
exports.getShopProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get all products (Public)
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Delete Product (Seller only)
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Ensure only the owner can delete
    if (product.shopId.toString() !== req.seller.id) {
        return next(new ErrorHandler("Unauthorized to delete this product", 403));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
