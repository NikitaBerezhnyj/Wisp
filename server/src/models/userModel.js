const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_TOKEN, {
    expiresIn: "7d"
  });
  return token;
};

const User = mongoose.model("user", userSchema);

// Валідація реєстрації
const validateRegistration = data => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password")
  });
  return schema.validate(data);
};

// Валідація полів для входу
const validateLogin = data => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};

// Валідація пароля
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
