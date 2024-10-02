import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Container } from "react-bootstrap";
import { deleteUser } from "../api/userApi";
import "../styles/components/Settings.css";

export default function Settings() {
  const [showModal, setShowModal] = useState(false);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }
    return null;
  };

  const handleDeleteUser = async () => {
    const userId = getUserIdFromToken();
    await deleteUser(userId);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    handleDeleteUser();
  };

  return (
    <Container className="settings-container">
      <h2>Settings</h2>
      <label htmlFor="language-select">Select Language</label>
      <select name="language-select" id="">
        <option value="en">English</option>
        <option value="ua">Ukrainian</option>
      </select>
      <label htmlFor="theme-select">Select Theme</label>
      <select name="theme-select" id="">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <button
        className="setting-delete-button"
        onClick={() => setShowModal(true)}
      >
        Delete account
      </button>

      {showModal && (
        <div className="setting-modal">
          <div className="setting-modal-content">
            <h3>Are you sure you want to delete your account?</h3>
            <div>
              <button onClick={handleConfirmDelete}>Yes, delete</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
