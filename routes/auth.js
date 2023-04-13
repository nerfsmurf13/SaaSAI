const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  resetPasswordGo,
  getRefreshToken,
  getSubscription,
  getCustomer,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

// Render password reset form
// router.get("/reset-password/:token", resetPassword);
// Handle password reset form submission
router.post("/reset-password-go", resetPasswordGo);
router.post("/reset-password", resetPassword);
router.get("/refresh-token", getRefreshToken);
router.get("/subscription", protect, getSubscription);
router.get("/customer", protect, getCustomer);

module.exports = router;
