// Завантаження змінних середовища та імпорт необхідних модулів
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Підключення власних рішень
const connection = require("./database");
const userRoutes = require("./routes/userRoutes");

// Створення екземпляра Express
const app = express();

// Визначення порту і хосту для запуску сервера
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || "127.1.2.133";

// Перевірка змінних середовища
if (
  !process.env.ORIGIN_WEBSITE ||
  !process.env.DB ||
  !process.env.JWT_PRIVATE_TOKEN ||
  !process.env.SALT
) {
  console.error("Missing necessary environment variables");
  process.exit(1);
}

// Проміжне програмне забезпечення
// app.use(cors({ origin: process.env.ORIGIN_WEBSITE }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Підключення до бази даних MongoDB
connection();

// Налаштування маршрутизації API
app.use("/api", userRoutes);

// Запуск сервера
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started on http://${HOSTNAME}:${PORT}`);
});
