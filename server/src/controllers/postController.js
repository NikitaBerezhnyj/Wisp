const { Post, validatePost } = require("../models/postModel");
const User = require("../models/userModel"); // шляхи до файлів можуть відрізнятися

// Створення нового посту
exports.createPost = async (req, res) => {
  // Валідація даних поста
  const { error } = validatePost(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    // Створюємо новий пост на основі даних з тіла запиту
    const post = new Post({
      user: req.body.user, // ID користувача, який створив пост
      content: req.body.content, // Текст поста
      postImage: req.body.postImage || "", // URL зображення, якщо є
      likes: [], // Початково порожній масив лайків
      dislikes: [], // Початково порожній масив дизлайків
      comments: [] // Початково порожній масив коментарів
    });

    // Зберігаємо пост у базі даних
    await post.save();

    // Надсилаємо відповідь з новим постом
    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ message: "Error creating post" });
  }
};

// // Лайк посту
// exports.likePost = async (req, res) => {
//   // Реалізувати код тут
// };

// // Дизлайк посту
// exports.dislikePost = async (req, res) => {
//   // Реалізувати код тут
// };
// Лайк посту
exports.likePost = async (req, res) => {
  const userId = req.body.userId; // ID користувача, який лайкає пост
  const postId = req.params.id; // ID поста

  try {
    const post = await Post.findById(postId);

    // Якщо користувач вже лайкнув пост, видалити лайк
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Додати лайк до поста
      post.likes.push(userId);
      // Якщо пост вже дизлайкнувся, видалити дизлайк
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    }

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send({ message: "Error liking post" });
  }
};

// Дизлайк посту
exports.dislikePost = async (req, res) => {
  const userId = req.body.userId; // ID користувача, який дизлайкає пост
  const postId = req.params.id; // ID поста

  try {
    const post = await Post.findById(postId);

    // Якщо користувач вже дизлайкнув пост, видалити дизлайк
    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    } else {
      // Додати дизлайк до поста
      post.dislikes.push(userId);
      // Якщо пост вже лайкнувся, видалити лайк
      post.likes = post.likes.filter(id => id.toString() !== userId);
    }

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error("Error disliking post:", error);
    res.status(500).send({ message: "Error disliking post" });
  }
};

// Додавання коментаря до посту
exports.addComment = async (req, res) => {
  // Реалізувати код тут
};

// Отримання стрічки постів
exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .populate("user", "username avatarImage") // Populate user fields
      .sort({ createdAt: -1 }) // Сортування від нових до старих
      .skip(skip)
      .limit(limit)
      .exec();

    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ message: "Error fetching posts" });
  }
};

// Отримання постів одного окремого користувача
exports.getUserPosts = async (req, res) => {
  const { user_id } = req.params; // Отримуємо user_id із запиту
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Витягаємо пости тільки конкретного користувача
    const posts = await Post.find({ user: user_id }) // Фільтр за user_id
      .populate("user", "username avatarImage") // Populate user fields
      .sort({ createdAt: -1 }) // Сортування від нових до старих
      .skip(skip)
      .limit(limit)
      .exec();

    if (!posts.length) {
      return res.send(null); // Повертаємо null, якщо немає постів
    }

    res.send(posts); // Повертаємо знайдені пости
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).send({ message: "Error fetching user posts" });
  }
};

// Редагування посту
exports.editPost = async (req, res) => {
  // Реалізувати код тут
};

// Видалення посту
exports.deletePost = async (req, res) => {
  // Реалізувати код тут
};
