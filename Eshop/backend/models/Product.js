const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (v) {
          if (this.originalPrice) return v <= this.originalPrice;
          return true;
        },
        message: "Discount price must be less than or equal to original price",
      },
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 1,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    shopId: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
