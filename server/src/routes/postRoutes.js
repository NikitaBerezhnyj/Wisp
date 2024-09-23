const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Post запити
router.post("/posts", postController.createPost); // створення нового посту
router.post("/posts/:id/like", postController.likePost); // лайк посту
router.post("/posts/:id/dislike", postController.dislikePost); // дизлайк посту
router.post("/posts/:id/comment", postController.addComment); // додавання коментаря
// Get запити
router.get("/posts", postController.getPosts); // отримання стрічки постів
router.get("/posts/:user_id", postController.getUserPosts);
// Put запити
router.put("/posts/:id", postController.editPost); // редагування посту
// Delete запити
router.delete("/posts/:id", postController.deletePost); // видалення посту

module.exports = router;
