import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const createPost = async postData => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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

export const getUserPosts = async (user_id, page, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/posts/${user_id}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPost = async (postId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async postId => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`, {
      userId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikePost = async (postId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/dislike`, {
      userId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
