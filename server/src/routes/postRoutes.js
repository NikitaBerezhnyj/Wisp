const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/posts", postController.createPost);
router.post("/posts/:id/like", postController.likePost);
router.post("/posts/:id/dislike", postController.dislikePost);
router.post("/posts/:id/comment", postController.addComment);
router.get("/posts", postController.getPosts);
router.get("/posts/:user_id", postController.getUserPosts);
router.put("/posts/:id", postController.editPost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
