// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// // Моделі
// const { User, validate } = require("../models/userModel");
// const ResetToken = require("../models/resetTokenModel");

// // Налаштування транспортеру для надсилання електронних листів
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// // Валідація пароля
// const validatePassword = (password) => {
//   const schema = passwordComplexity();
//   return schema.validate(password);
// };

// // Реєстрація користувача
// router.post("/register", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     if (user)
//       return res
//         .status(409)
//         .send({ message: "User with given email already exists!" });

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     await new User({ ...req.body, password: hashPassword }).save();
//     res.status(201).send({ message: "User created successfully" });
//   } catch (err) {
//     console.error("Error during user registration:", err);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// // Логін користувача
// router.post("/login", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     if (!user)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     const token = user.generateAuthToken();
//     res.status(200).send({ data: token, message: "Logged in successfully" });
//   } catch {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// // Надсилання звіту про помилки
// router.post("/send-report", async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).json({ message: "Message is required" });
//   }

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: process.env.EMAIL,
//       subject: "Error Report",
//       text: message,
//     });

//     res.status(200).json({ message: "Report sent successfully" });
//   } catch (error) {
//     console.error("Failed to send report:", error);
//     res.status(500).json({ message: "Failed to send report" });
//   }
// });

// // Забули пароль
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     await ResetToken.create({
//       token: resetToken,
//       userId: user._id,
//     });

//     const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
//     await transporter.sendMail({
//       to: email,
//       subject: "Password Reset",
//       text: `You requested a password reset. Please click the following link to reset your password: ${resetURL}`,
//     });

//     res.status(200).json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     res.status(500).json({ message: "Error sending password reset email" });
//   }
// });

// // Скидання паролю
// router.post("/reset-password/:token", async (req, res) => {
//   const { password } = req.body;
//   const { token } = req.params;

//   if (!password)
//     return res.status(400).json({ message: "Password is required" });

//   const { error } = validatePassword(password);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   try {
//     const resetToken = await ResetToken.findOne({ token });
//     if (!resetToken)
//       return res.status(400).json({ message: "Invalid or expired token" });

//     const user = await User.findById(resetToken.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isSamePassword = await bcrypt.compare(password, user.password);
//     if (isSamePassword)
//       return res.status(400).json({
//         message: "New password must be different from the current one.",
//       });

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user.password = hashedPassword;
//     await user.save();

//     await resetToken.deleteOne();
//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(500).json({ message: "Error resetting password" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/send-report", userController.sendErrorReport);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
