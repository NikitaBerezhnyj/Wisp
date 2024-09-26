const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  postImage: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

const validatePost = data => {
  const schema = Joi.object({
    content: Joi.string().required().label("Content"),
    postImage: Joi.string().allow("").label("Post Image"),
    user: Joi.string().required().label("User ID"),
    comments: Joi.array().items(
      Joi.object({
        user: Joi.string().required().label("User ID"),
        content: Joi.string().required().label("Comment Content")
      })
    )
  });
  return schema.validate(data);
};

module.exports = {
  Post,
  validatePost
};
