// import React from "react";
// import { FaGoogle } from "react-icons/fa";
// import "../styles/components/SignUp.css";

// export default function SignUp() {
//   return (
//     <div className="sign-up-wrapper">
//       <div className="form-container">
//         <div className="form-container-header">
//           <h2>Sign Up</h2>
//         </div>
//         <p className="login-prompt">
//           Already have an account?{" "}
//           <button className="login-button">Log In</button>
//         </p>
//         <label htmlFor="email">Username</label>
//         <input id="text" type="text" placeholder="Enter your username" />
//         <label htmlFor="email">Email</label>
//         <input id="email" type="email" placeholder="Enter your email" />
//         <label htmlFor="password">Password</label>
//         <input id="password" type="password" placeholder="Password" />
//         <label htmlFor="confirm-password">Confirm Password</label>
//         <input
//           id="confirm-password"
//           type="password"
//           placeholder="Confirm Password"
//         />
//         <button type="submit" className="sign-up-button">
//           Sign Up
//         </button>
//         <button type="button" className="google-sign-up-button">
//           <FaGoogle /> <span>Sign up with Google</span>
//         </button>
//       </div>
//       <div className="image-container">
//         <img src="/img/boat.gif" alt="Decorative boat animation" />
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import "../styles/components/SignUp.css";

export default function SignUp({ onSignUp, onSwitchToSignIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "* Username is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "* Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "* Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "* Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "* Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "* Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "* Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        username,
        email,
        password,
      };
      console.log("Sending data to server:", userData);
      onSignUp();
    }
  };

  return (
    <div className="sign-up-wrapper">
      <div className="form-container">
        <div className="form-container-header">
          <h2>Sign Up</h2>
        </div>
        <p className="login-prompt">
          Already have an account?{" "}
          <button
            type="button"
            className="login-button"
            onClick={() => {
              onSwitchToSignIn();
            }}
          >
            Log In
          </button>
        </p>
        <div className="input-header">
          <label htmlFor="username">Username</label>
          {errors.username && (
            <p style={{ color: "red" }} id="username-error">
              {errors.username}
            </p>
          )}
        </div>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors({ ...errors, username: "" });
          }}
          ref={usernameInputRef}
          aria-describedby="username-error"
        />
        <div className="input-header">
          <label htmlFor="email">Email</label>
          {errors.email && (
            <p style={{ color: "red" }} id="email-error">
              {errors.email}
            </p>
          )}
        </div>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          ref={emailInputRef}
          aria-describedby="email-error"
        />
        <div className="input-header">
          <label htmlFor="password">Password</label>
          {errors.password && (
            <p style={{ color: "red" }} id="password-error">
              {errors.password}
            </p>
          )}
        </div>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: "" });
          }}
          ref={passwordInputRef}
          aria-describedby="password-error"
        />
        <div className="input-header">
          <label htmlFor="confirm-password">Confirm Password</label>
          {errors.confirmPassword && (
            <p style={{ color: "red" }} id="confirm-password-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors({ ...errors, confirmPassword: "" });
          }}
          ref={confirmPasswordInputRef}
          aria-describedby="confirm-password-error"
        />
        <button
          type="submit"
          className="sign-up-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Sign Up
        </button>
        <button type="button" className="google-sign-up-button">
          <FaGoogle /> <span>Sign up with Google</span>
        </button>
      </div>
      <div className="image-container">
        <img src="/img/boat.gif" alt="Decorative boat animation" />
      </div>
    </div>
  );
}
