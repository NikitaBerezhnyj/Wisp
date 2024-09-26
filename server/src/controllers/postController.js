const { Post, validatePost } = require("../models/postModel");
const User = require("../models/userModel");

exports.createPost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    const post = new Post({
      user: req.body.user,
      content: req.body.content,
      postImage: req.body.postImage || "",
      likes: [],
      dislikes: [],
      comments: []
    });

    await post.save();

    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ message: "Error creating post" });
  }
};

exports.likePost = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    }

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send({ message: "Error liking post" });
  }
};

exports.dislikePost = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    } else {
      post.dislikes.push(userId);
      post.likes = post.likes.filter(id => id.toString() !== userId);
    }

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error("Error disliking post:", error);
    res.status(500).send({ message: "Error disliking post" });
  }
};

exports.addComment = async (req, res) => {
  // Реалізувати код тут
};

exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .populate("user", "username avatarImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ message: "Error fetching posts" });
  }
};

exports.getUserPosts = async (req, res) => {
  const { user_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find({ user: user_id })
      .populate("user", "username avatarImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (!posts.length) {
      return res.send(null);
    }

    res.send(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).send({ message: "Error fetching user posts" });
  }
};

exports.editPost = async (req, res) => {
  // Реалізувати код тут
};

exports.deletePost = async (req, res) => {
  // Реалізувати код тут
};
