import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { updateUserProfile, saveUploadFile } from "../api/userApi";
import "../styles/components/ProfileEdit.css";

export default function ProfileEdit({ profileData, onClose, onUpdateProfile }) {
  const [username, setUsername] = useState(profileData.username);
  const [about, setAbout] = useState(profileData.about || "");
  const [avatarImage, setAvatarImage] = useState(profileData.avatarImage || "");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    try {
      let avatarUrl = avatarImage;

      if (selectedFile) {
        const uploadResponse = await saveUploadFile(selectedFile);
        avatarUrl = uploadResponse.filePath;
      }

      const updatedProfile = {
        currentUsername: profileData.username,
        username,
        about,
        avatarImage: avatarUrl
      };

      await updateUserProfile(updatedProfile);
      onUpdateProfile(updatedProfile);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-edit-container">
      <button className="profile-edit-close" onClick={onClose}>
        <IoClose />
      </button>
      <div className="profile-edit-wrap">
        <h2>Edit Profile</h2>
        <form className="profile-edit-form">
          <div className="avatar-wrapper" onClick={handleImageClick}>
            <img
              src={avatarImage || "/placeholder-avatar.png"}
              alt="Avatar"
              className="avatar-image"
            />
            <label className="avatar-image-label" htmlFor="avatar">
              Change Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
          <div className="form-group-wrap">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="about">About</label>
              <textarea
                id="about"
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="profile-edit-actions">
          <button onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
