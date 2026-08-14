const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/process", isAuthenticated, processPayment);
router.get("/stripeapikey", isAuthenticated, sendStripeApiKey);

module.exports = router;
