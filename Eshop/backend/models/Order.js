const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String },
      zipCode: { type: String, required: true },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    paymentInfo: {
      id: { type: String },
      status: { type: String, enum: ["Succeeded", "Pending", "Failed"], required: true },
      type: { type: String, enum: ["Stripe", "CashOnDelivery"], required: true },
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
