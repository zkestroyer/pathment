const express = require("express");
const { createOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { isAuthenticated, isSeller } = require("../middleware/auth");

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.get("/get-all-orders/:userId", isAuthenticated, getAllOrders);
router.put("/update-order-status/:id", isSeller, updateOrderStatus);

module.exports = router;
