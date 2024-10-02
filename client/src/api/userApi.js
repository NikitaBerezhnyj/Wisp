import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const registerUser = async userData => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async credentials => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchedUser = async searchPrompt => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { searchPrompt }
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

export const getUserById = async userId => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getUserById:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

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

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/password/reset/${token}`, {
      password: newPassword
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reportFromUser = async reportData => {
  try {
    await axios.post(`${API_URL}/send-report`, reportData);
    console.log("Error report sent successfully");
  } catch (error) {
    console.error("Error sending report:", error);
  }
};

export const deleteUser = async userId => {
  try {
    await axios.delete(`${API_URL}/user/${userId}`);
    console.log("Error deleting user");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const saveUploadFile = async selectedFile => {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);

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
