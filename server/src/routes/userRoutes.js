const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Post запити
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/send-report", userController.sendErrorReport);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);
// Get запити
router.get("/profile/:username", userController.getUserProfileInfo);
// router.post("/search", userController.getUserSearchInfo);
router.get("/search", userController.getUserSearchInfo);

module.exports = router;
