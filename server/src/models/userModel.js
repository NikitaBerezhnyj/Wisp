const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  about: { type: String, trim: true },
  avatarImage: { type: String, trim: true, default: "/img/portrait.jpg" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_PRIVATE_TOKEN,
    { expiresIn: "7d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validateRegistration = data => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password")
  });
  return schema.validate(data);
};

const validateLogin = data => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};

const validatePassword = password => {
  const schema = passwordComplexity();
  return schema.validate(password);
};

module.exports = {
  User,
  validateRegistration,
  validateLogin,
  validatePassword
};
