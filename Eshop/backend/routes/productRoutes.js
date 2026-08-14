const express = require("express");
const { createProduct, getShopProducts, getAllProducts, deleteProduct } = require("../controllers/productController");
const { isSeller } = require("../middleware/auth");

const router = express.Router();

router.post("/create-product", isSeller, createProduct);
router.get("/get-all-products-shop/:id", getShopProducts);
router.get("/get-all-products", getAllProducts);
router.delete("/delete-product/:id", isSeller, deleteProduct);

module.exports = router;
