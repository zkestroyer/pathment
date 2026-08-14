const express = require("express");
const { registerShop, loginShop, getShopProfile, logoutShop } = require("../controllers/shopController");
const { isSeller } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerShop);
router.post("/login", loginShop);
router.get("/me", isSeller, getShopProfile);
router.get("/logout", logoutShop);

module.exports = router;
