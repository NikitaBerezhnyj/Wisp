const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Завершити процес у випадку помилки
  }
};
