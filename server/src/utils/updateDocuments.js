const mongoose = require("mongoose");
require("dotenv").config(); // Для завантаження змінних середовища з .env файлу

// Константи для налаштування
const DATABASE_URL = process.env.DB; // URL підключення до MongoDB
const COLLECTION_NAME = "users"; // Назва колекції
const NEW_FIELD_NAME = "posts"; // Назва нового поля
const DEFAULT_VALUE = []; // Значення нового поля

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Завершити процес у випадку помилки
  }
};

const addNewField = async () => {
  try {
    // Ось тут ми не визначаємо схему, а просто використовуємо модель колекції
    const CurrentModel = mongoose.model(
      COLLECTION_NAME,
      new mongoose.Schema({}, { strict: false })
    );

    // Додаємо нове поле до всіх документів
    const result = await CurrentModel.updateMany(
      {},
      { $set: { [NEW_FIELD_NAME]: DEFAULT_VALUE } }
    );

    console.log(
      `${result.nModified} documents were updated with the new field.`
    );
  } catch (error) {
    console.error("Error updating documents:", error);
  } finally {
    mongoose.connection.close(); // Закриваємо підключення після завершення
  }
};

const runScript = async () => {
  await connectToDatabase();
  await addNewField();
};

runScript();
