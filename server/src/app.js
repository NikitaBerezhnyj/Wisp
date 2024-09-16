// Завантаження змінних середовища та імпорт необхідних модулів
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Підключення власних рішень
const connection = require("./database");

// Створення екземпляра Express
const app = express();

// Визначення порту і хосту для запуску сервера
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || "127.1.2.133";

// Проміжне програмне забезпечення
app.use(cors());
app.use(express.json());

// Підключення до бази даних MongoDB
connection();

// Запуск сервера
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started on http://${HOSTNAME}:${PORT}`);
});
