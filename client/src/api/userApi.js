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

// Функція для отримання даних пошуку користувачів
export const getSearchedUser = async searchPrompt => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { searchPrompt } // Додаємо параметри запиту
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in getSearchedUser:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Функція для отримання даних профілю користувача
export const getUserProfile = async username => {
  try {
    const response = await axios.get(`${API_URL}/profile/${username}`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error in getUserProfile:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Оновлення інформації про користувача (about та avatar)
export const updateUserProfile = async updatedProfile => {
  try {
    const response = await axios.put(
      `${API_URL}/profile/${updatedProfile.currentUsername}/edit`,
      updatedProfile
    );
    console.log("User data update has been successfully");
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// // Функція для підписки на користувача
// export const followUser = async userId => {
//   try {
//     const response = await axios.post(`${API_URL}/follow`, { userId });
//     return response.data;
//   } catch (error) {
//     console.error("Error following user:", error);
//     throw error;
//   }
// };

// // Функція для відписки від користувача
// export const unfollowUser = async userId => {
//   try {
//     const response = await axios.post(`${API_URL}/unfollow`, { userId });
//     return response.data;
//   } catch (error) {
//     console.error("Error unfollowing user:", error);
//     throw error;
//   }
// };
// Функція для підписки на користувача
export const followUser = async (userId, followerId) => {
  try {
    const response = await axios.post(`${API_URL}/follow`, {
      userId,
      followerId
    });
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

// Функція для відписки від користувача
export const unfollowUser = async (userId, followerId) => {
  try {
    const response = await axios.post(`${API_URL}/unfollow`, {
      userId,
      followerId
    });
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

// Функція для надсилання листа з скиданням пароля
export const sendPasswordResetEmail = async email => {
  try {
    const response = await axios.post(`${API_URL}/password/change`, {
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
    const response = await axios.post(`${API_URL}/password/reset/${token}`, {
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

// export const saveUploadFile = async selectedFile => {
//   try {
//     const response = await axios.put(`${API_URL}/upload`, selectedFile);
//     console.log("Upload file save successfully");
//     return response.data;
//   } catch (error) {
//     console.error("Error saving upload file:", error);
//   }
// };

export const saveUploadFile = async selectedFile => {
  try {
    // Створюємо об'єкт FormData
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Виконуємо PUT запит з використанням FormData
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("Upload file saved successfully");
    return response.data;
  } catch (error) {
    console.error("Error saving upload file:", error);
  }
};
