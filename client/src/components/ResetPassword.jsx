import React, { useState } from "react";
import { resetPassword } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "../styles/components/ResetPassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword(token, password);
      setMessage("Password reset successful.");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <div className="password-input-container">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <label htmlFor="password-repeat">Repeat new Password</label>
        <div className="password-input-container">
          <input
            id="password-repeat"
            type={showRepeatPassword ? "text" : "password"}
            placeholder="Repeat new password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          >
            {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
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
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
