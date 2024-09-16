# Wisp

#### Repository translates: [українська :ukraine:](#wisp-ukraine), [english :uk:](#wisp-uk)

## Wisp :ukraine:

### Про проєкт

<p align='center'>
    <img src="./client/public/wisp.svg" alt="working screen" style="width:25%">
</p>

**_Wisp_** - це соціальна платформа, що фокусується на свободі висловлювань та простоті використання. Наша мета - створити простір для обміну думками та ідеями у стислій формі.

### Особливості

- **_Короткі пости:_** Діліться своїми думками у постах до 280 символів.
- **_Форматування тексту:_** Використовуйте курсив та жирний шрифт для виділення важливого.
- **_Взаємодія:_** Лайкайте, дизлайкайте та коментуйте пости інших користувачів.
- **_Мінімалістичний дизайн:_** Зосередьтеся на контенті, а не на зайвих елементах інтерфейсу.

### Технічний стек

- **_Frontend:_** React, Bootstrap
- **_Backend:_** Node.js, Express.js
- **_База даних:_** MongoDB
- **_Аутентифікація:_** JSON Web Tokens (JWT)
- **_Розгортання:_** Docker, хмарні сервіси (AWS, Heroku, Vercel)

### Встановлення

#### 1. Клонуйте репозиторій:

```bash
git clone https://github.com/NikitaBerezhnyj/Wisp.git
```

#### 2. Встановіть залежності:

```bash
cd Wisp
npm install
```

#### 3. Налаштуйте змінні середовища в файлі .env:

```js
MONGODB_URI = your_mongodb_connection_string;
JWT_SECRET = your_jwt_secret;
```

#### 4. Запуск проєкту

Існує два способи запуску проєкту. Ви можете вибрати один з них в залежності від ваших потреб:

- **Запустити весь проєкт одразу** — ця опція автоматично запустить як frontend, так і backend одночасно, що зручно для розробки та тестування.
- **Запустити frontend та backend окремо** — цей варіант дозволяє запустити кожну частину проєкту в окремих терміналах, що може бути корисно, якщо ви хочете мати більше контролю над кожним компонентом.

##### 4.1 Запуск всього проєкту одночасно

Щоб запустити frontend і backend одночасно, скористайтесь наступною командою з кореневого каталогу проєкту:

```bash
npm start
```

##### 4.2 Запуск frontend та backend окремо (рекомендований варіант):

Якщо ви бажаєте запустити frontend та backend окремо, виконайте наступні кроки:

**_1. Запуск frontend_**

Відкрийте термінал, перейдіть у директорію client і запустіть frontend застосунок:

```bash
npm run start:client
```

або

```bash
cd client

npm start
```

**_2. Запуск backend_**

Відкрийте новий термінал, перейдіть у директорію server і запустіть сервер:

```bash
npm run start:server
```

або

```bash
cd server

npm start
```

<hr />

## Wisp :uk:

### About the Project

<p align='center'>
    <img src="./client/public/wisp.svg" alt="working screen" style="width:25%">
</p>

**_Wisp_** is a social platform focused on freedom of expression and ease of use. Our goal is to create a space for sharing thoughts and ideas in a concise format.

### Features

- **_Short posts:_** Share your thoughts in posts up to 280 characters.
- **_Text formatting:_** Use italics and bold text to highlight important points.
- **_Interaction:_** Like, dislike, and comment on other users' posts.
- **_Minimalist design:_** Focus on the content, not on unnecessary interface elements.

### Tech Stack

- **_Frontend:_** React, Bootstrap
- **_Backend:_** Node.js, Express.js
- **_Database:_** MongoDB
- **_Authentication:_** JSON Web Tokens (JWT)
- **_Deployment:_** Docker, cloud services (AWS, Heroku, Vercel)

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/NikitaBerezhnyj/Wisp.git
```

#### 2. Install dependencies

```bash
cd Wisp
npm install
```

#### 3. Configure environment variables in the .env file:

```js
MONGODB_URI = your_mongodb_connection_string;
JWT_SECRET = your_jwt_secret;
```

#### 4. Start the project:

There are two ways to run the project. You can choose one depending on your needs:

- **_Run the entire project at once_** — this option will automatically start both the frontend and backend simultaneously, which is convenient for development and testing.
- **_Run frontend and backend separately_** — this option allows you to run each part of the project in separate terminals, which can be useful if you want more control over each component.

##### 4.1 Running the entire project at once

To run both frontend and backend simultaneously, use the following command from the root directory of the project:

```bash
npm start
```

##### 4.2 Running frontend and backend separately (recommended option):

If you prefer to run frontend and backend separately, follow these steps:

**_1. Running the frontend_**

Open a terminal, navigate to the client directory, and start the frontend application:

```bash
npm run start:client
```

or

```bash
cd client

npm start
```

**_2. Running the backend_**

Open a new terminal, navigate to the server directory, and start the server:

```bash
npm run start:server
```

or

```bash
cd server

npm start
```
