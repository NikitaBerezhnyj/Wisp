# Довідка з API в Wisp

- [Довідка з API в Wisp](#довідка-з-api-в-wisp)
  - [User API](#user-api)
    - [POST /register](#post-register)
    - [POST /login](#post-login)
    - [GET /search](#get-search)
    - [GET /profile/:username](#get-profileusername)
    - [PUT /profile/:username/edit](#put-profileusernameedit)
    - [POST /password/change](#post-passwordchange)
    - [POST /password/reset/:token](#post-passwordresettoken)
    - [POST /send-report](#post-send-report)
  - [Post API](#post-api)
    - [GET /posts](#get-posts)
    - [POST /posts](#post-posts)
    - [PUT /posts/:id](#put-postsid)
    - [DELETE /posts/:id](#delete-postsid)
    - [POST /posts/:id/like](#post-postsidlike)
    - [POST /posts/:id/dislike](#post-postsiddislike)
    - [POST /posts/:id/comment](#post-postsidcomment)

## User API

Цей розділ містить кінцеві точки, що стосуються користувачів. Вони охоплюють функціонал реєстрації, аутентифікації, редагування профілю та управління паролями. Використовуйте ці API для взаємодії з інформацією про користувачів та їхні профілі в системі Wisp.

### POST /register

**Опис:** Реєстрація нового користувача в системі.

**Запит:**

- **URL:** /register
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "confirmPassword": "yourpassword"
  }
  ```

**Відповідь:**

- **Статус 201:** Успішна реєстрація.

  ```json
  {
    "message": "User registered successfully."
  }
  ```

- **Статус 400:** Помилка валідації (наприклад, некоректний email або пароль).

  ```json
  {
    "error": "Invalid email or password."
  }
  ```

### POST /login

**Опис:** Вхід користувача в систему.

**Запит:**

- **URL:** /login
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

**Відповідь:**

- **Статус 200:** Успішний вхід.

  ```json
  {
    "token": "JWT_TOKEN",
    "user": {
      "username": "username",
      "email": "user@example.com"
    }
  }
  ```

- **Статус 401:**: Неправильний email або пароль.

  ```json
  {
    "error": "Invalid email or password."
  }
  ```

### GET /search

**Опис:** Пошук користувачів за іменем або прізвищем.

**Запит:**

- **URL:** /search
- **Метод:** GET
- **Параметри запиту:**
  - `query:` username або частина username

**Відповідь:**

- **Статус 200:** Успішний пошук.

  ```json
  {
    "results": [
      {
        "username": "username",
        "bio": "User bio",
        "avatar": "url_to_avatar"
      }
    ]
  }
  ```

### GET /profile/:username

**Опис:** Перегляд профілю користувача.

**Запит:**

- **URL:** /profile/:username
- **Метод:** GET

**Відповідь:**

- **Статус 200:** Успішне отримання профілю.

  ```json
  {
    "username": "username",
    "bio": "User bio",
    "posts": [
      {
        "id": "post_id",
        "content": "Post content"
      }
    ]
  }
  ```

### PUT /profile/:username/edit

**Опис:** Редагування профілю користувача.

**Запит:**

- **URL:** /profile/:username/edit
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "bio": "New bio here.",
    "avatar": "url_to_new_avatar"
  }
  ```

**Відповідь:**

- **Статус 200:** Успішне редагування профілю.

  ```json
  {
    "message": "Profile updated successfully."
  }
  ```

### POST /password/change

**Опис:** Відновлення паролю, надсилає електронного листа з посиланням на скидання пароля.

**Запит:**

- **URL:** /password/change
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "email": "user@example.com"
  }
  ```

**Відповідь:**

- **Статус 200:** Лист успішно надіслано.

  ```json
  {
    "message": "Password reset email sent"
  }
  ```

- **Статус 404:** Користувача не знайдено.

  ```json
  {
    "message": "User not found"
  }
  ```

- **Статус 500:** Помилка сервера.

  ```json
  {
    "message": "Error sending password reset email"
  }
  ```

### POST /password/reset/:token

**Опис** Скидання паролю за токеном.

**Запит:**

- **URL:** /password/reset/
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "password": "newpassword"
  }
  ```

**Відповідь:**

- **Статус 200:** Пароль успішно змінено.

  ```json
  {
    "message": "Password reset successful"
  }
  ```

- **Статус 400:** Токен недійсний або закінчився термін дії.

  ```json
  {
    "message": "Invalid or expired token"
  }
  ```

- **Статус 404:** Користувача не знайдено.

  ```json
  {
    "message": "User not found"
  }
  ```

- **Статус 500:** Помилка сервера.

  ```json
  {
    "message": "Error resetting password"
  }
  ```

### POST /send-report

**Опис** Надсилання звіту про помилки.

**Запит:**

- **URL:** /send-report
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "message": "Description of the issue"
  }
  ```

**Відповідь:**

- **Статус 200:** Успішне надсилання звіту.

  ```json
  {
    "message": "Report sent successfully"
  }
  ```

- **Статус 400:** Повідомлення обов'язкове.

  ```json
  {
    "message": "Message is required"
  }
  ```

- **Статус 500:** Помилка під час надсилання.

  ```json
  {
    "message": "Failed to send report"
  }
  ```

---

## Post API

У цьому розділі зібрані кінцеві точки, що стосуються управління постами. Вони дозволяють створювати, редагувати, видаляти пости, а також додавати лайки, дизлайки та коментарі. Цей API є ключовим для роботи зі стрічкою постів у соціальній мережі Wisp.

### GET /posts

**Опис:** Отримання стрічки постів для користувача.

**Запит:**

- **URL:** /posts
- **Метод:** GET
- **Заголовки:**
  Authorization: Bearer JWT_TOKEN

**Відповідь:**

- **Статус 200:** Успішне отримання постів.

  ```json
  {
    "posts": [
      {
        "id": "post_id",
        "content": "Post content",
        "likes": 10,
        "dislikes": 2,
        "comments": 5,
        "author": "username"
      }
    ]
  }
  ```

### POST /posts

**Опис:** Створення нового посту.

**Запит:**

- **URL:** /posts
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "content": "Your post content here."
  }
  ```

**Відповідь:**

- **Статус 201:** Успішне створення посту.

  ```json
  {
    "message": "Post created successfully.",
    "post": {
      "id": "new_post_id",
      "content": "Your post content here."
    }
  }
  ```

### PUT /posts/:id

**Опис:** Редагування існуючого посту.

**Запит:**

- **URL:** /posts/:id
- **Метод:** PUT
- **Тіло запиту:**

  ```json
  {
    "content": "Updated post content."
  }
  ```

**Відповідь:**

- **Статус 200:** Успішне редагування посту.

  ```json
  {
    "message": "Post updated successfully."
  }
  ```

### DELETE /posts/:id

**Опис:** Видалення посту.

**Запит:**

- **URL:** /posts/:id
- **Метод:** DELETE

**Відповідь:**

- **Статус 200:** Успішне видалення посту.

  ```json
  {
    "message": "Post deleted successfully."
  }
  ```

### POST /posts/:id/like

**Опис:** Лайк посту.

**Запит:**

- **URL:** /posts/:id/like
- **Метод:** POST

**Відповідь:**

- **Статус 200:** Успішно лайкнуто.

  ```json
  {
    "message": "Post liked."
  }
  ```

### POST /posts/:id/dislike

**Опис:** Дизлайк посту.

**Запит:**

- **URL:** /posts/:id/dislike
- **Метод:** POST

**Відповідь:**

- **Статус 200:** Успішно дизлайкнуто.

  ```json
  {
    "message": "Post disliked."
  }
  ```

### POST /posts/:id/comment

**Опис:** Додавання коментаря до посту.

**Запит:**

- **URL:** /posts/:id/comment
- **Метод:** POST
- **Тіло запиту:**

  ```json
  {
    "comment": "Your comment here."
  }
  ```

**Відповідь:**

- **Статус 201:** Успішне додавання коментаря.

  ```json
  {
    "message": "Comment added.",
    "comment": {
      "id": "comment_id",
      "content": "Your comment here."
    }
  }
  ```
