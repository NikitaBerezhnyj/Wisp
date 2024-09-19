import axios from "axios";

// Основний URL для вашого бекенду
const API_URL = "http://localhost:3001/api";

// Функція для реєстрації користувача
export const registerUser = async userData => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для входу користувача
export const loginUser = async credentials => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для надсилання листа з скиданням пароля
export const sendPasswordResetEmail = async email => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, {
      email
    });
    console.log("Email for reset password sent successfully");
    return response.data;
  } catch (error) {
    console.error(
      "Error sending reset password email:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Функція для скидання пароля
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {
      password: newPassword
    });
    return response.data; // Наприклад, підтвердження, що пароль змінено
  } catch (error) {
    throw error;
  }
};

// Функція надсилання повідомлення про помилку від користувача
export const reportFromUser = async reportData => {
  try {
    await axios.post(`${API_URL}/send-report`, reportData);
    console.log("Error report sent successfully");
  } catch (error) {
    console.error("Error sending report:", error);
  }
};
