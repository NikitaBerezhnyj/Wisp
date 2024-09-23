import axios from "axios";

// Основний URL для вашого бекенду
const API_URL = "http://localhost:3001/api";

// Функція для створення нового посту
export const createPost = async postData => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для отримання стрічки постів
export const getPosts = async (page, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/posts?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Отримання стрічки постів окремого користувача
export const getUserPosts = async (user_id, page, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/posts/${user_id}?page=${page}&limit=${limit}` // Видалено зайву "/"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для редагування посту
export const editPost = async (postId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для видалення посту
export const deletePost = async postId => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для лайку посту
export const likePost = async postId => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для дизлайку посту
export const dislikePost = async postId => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/dislike`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функція для додавання коментаря до посту
export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/comment`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
