const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, totalPrice, paymentInfo } = req.body;

    // Group cart items by shopId to create separate orders per seller
    const shopItemsMap = new Map();

    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product) return next(new ErrorHandler("Product not found", 404));

      const shopId = product.shopId.toString();
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    const orders = [];

    // Create an order for each seller
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user: req.user.id,
        shopId, // Added this field
        totalPrice, // In a real system, calculate total per seller
        paymentInfo,
        paidAt: paymentInfo.status === "Succeeded" ? Date.now() : undefined,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all orders of user
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all orders of a seller
exports.getShopOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ shopId: req.params.shopId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Order Status for Seller
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.status === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      
      // Update stock/sold counts
      for(const item of order.cart){
          await updateOrder(item.productId, item.quantity);
      }
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

async function updateOrder(id, qty) {
  const product = await Product.findById(id);
  product.stock -= qty;
  product.sold_out += qty;
  await product.save({ validateBeforeSave: false });
}
