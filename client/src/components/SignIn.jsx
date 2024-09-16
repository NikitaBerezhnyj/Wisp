// import React from "react";
// import { FaGoogle } from "react-icons/fa";
// import "../styles/components/SignIn.css";

// export default function SignIn() {
//   return (
//     <div className="sign-in-wrapper">
//       <div className="form-container">
//         <div className="form-container-header">
//           <h2>Sign In</h2>
//         </div>
//         <p className="registration-prompt">
//           Don't have an account?{" "}
//           <button className="register-button">Register</button>
//         </p>
//         <label htmlFor="email">Email</label>
//         <input id="email" type="email" placeholder="Enter your email" />
//         <label htmlFor="password">Password</label>
//         <input id="password" type="password" placeholder="Password" />
//         <button className="forgot-password-button">Forgot password?</button>
//         <button type="submit" className="sign-in-button">
//           Sign In
//         </button>
//         <button type="button" className="google-sign-in-button">
//           <FaGoogle /> <span>Sign in with Google</span>
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
import "../styles/components/SignIn.css";

export default function SignIn({ onSignIn, onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        email,
        password,
      };
      console.log("Sending data to server:", userData);
      onSignIn();
    }
  };

  return (
    <div className="sign-in-wrapper">
      <div className="form-container">
        <div className="form-container-header">
          <h2>Sign In</h2>
        </div>
        <p className="registration-prompt">
          Don't have an account?{" "}
          <button
            type="button"
            className="register-button"
            onClick={() => {
              onSwitchToSignUp();
            }}
          >
            Register
          </button>
        </p>
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
        <button type="button" className="forgot-password-button">
          Forgot password?
        </button>
        <button
          type="submit"
          className="sign-in-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Sign In
        </button>
        <button type="button" className="google-sign-in-button">
          <FaGoogle /> <span>Sign in with Google</span>
        </button>
      </div>
      <div className="image-container">
        <img src="/img/boat.gif" alt="Decorative boat animation" />
      </div>
    </div>
  );
}
