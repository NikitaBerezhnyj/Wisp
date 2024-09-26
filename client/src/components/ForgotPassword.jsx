import React, { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { sendPasswordResetEmail } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import "../styles/components/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage("Check your email for the reset link.");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("User with this email was not found.");
        } else if (err.response.status === 500) {
          setError("Internal server error. Please try again later.");
        } else {
          setError("Failed to send reset email.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoToRegister = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input
          id="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {error && (
          <div className="server-error-message">
            <CgDanger />
            {error}
          </div>
        )}
        {message && (
          <div className="server-success-message">
            <IoIosCheckmarkCircleOutline />
            {message}
          </div>
        )}
        <button type="submit">Send Reset Link</button>
      </form>

      <button onClick={handleGoToRegister} className="go-to-login-button">
        Back to SignIn
      </button>
    </div>
  );
}
