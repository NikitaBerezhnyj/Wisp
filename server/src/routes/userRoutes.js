const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/follow", userController.followUser);
router.post("/unfollow", userController.unfollowUser);
router.post("/password/change", userController.forgotPassword);
router.post("/password/reset/:token", userController.resetPassword);
router.post("/send-report", userController.sendErrorReport);
router.get("/search", userController.getUserSearchInfo);
router.get("/profile/:username", userController.getUserProfileInfo);
router.put("/profile/:username/edit", userController.editUserProfile);

router.post("/upload", upload.single("file"), userController.saveUploadedFile);

module.exports = router;
