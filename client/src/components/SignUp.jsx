// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import { CgDanger } from "react-icons/cg";
// import { registerUser } from "../api/userApi";
// import "../styles/components/SignUp.css";

// export default function SignUp() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!username.trim()) {
//       newErrors.username = "* Username is required";
//       isValid = false;
//     }

//     if (!email) {
//       newErrors.email = "* Email is required";
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "* Email is invalid";
//       isValid = false;
//     }

//     if (!password) {
//       newErrors.password = "* Password is required";
//       isValid = false;
//     } else if (password.length < 6) {
//       newErrors.password = "* Password must be at least 6 characters";
//       isValid = false;
//     }

//     if (!confirmPassword) {
//       newErrors.confirmPassword = "* Please confirm your password";
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "* Passwords do not match";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const userData = { username, email, password };
//         const res = await registerUser(userData);
//         localStorage.setItem("token", res.token);
//         window.location.reload();
//         console.log(res.message);
//       } catch (error) {
//         if (
//           error.response &&
//           error.response.status >= 400 &&
//           error.response.status <= 500
//         ) {
//           setErrorMessage(error.response.data.message);
//         }
//       }
//     }
//   };

//   return (
//     <div className="sign-up-wrapper">
//       <div className="form-container">
//         <div className="form-container-header">
//           <h2>Sign Up</h2>
//         </div>
//         <p className="login-prompt">
//           Already have an account?{" "}
//           <Link className="login-button" to={"/login"}>
//             Log In
//           </Link>
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div className="input-header">
//             <label htmlFor="username">Username</label>
//             {errors.username && (
//               <p style={{ color: "red" }} id="username-error">
//                 {errors.username}
//               </p>
//             )}
//           </div>
//           <input
//             id="username"
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//               setErrors({ ...errors, username: "" });
//             }}
//             aria-describedby="username-error"
//           />
//           <div className="input-header">
//             <label htmlFor="email">Email</label>
//             {errors.email && (
//               <p style={{ color: "red" }} id="email-error">
//                 {errors.email}
//               </p>
//             )}
//           </div>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setErrors({ ...errors, email: "" });
//             }}
//             aria-describedby="email-error"
//           />
//           <div className="input-header">
//             <label htmlFor="password">Password</label>
//             {errors.password && (
//               <p style={{ color: "red" }} id="password-error">
//                 {errors.password}
//               </p>
//             )}
//           </div>
//           <input
//             id="password"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setErrors({ ...errors, password: "" });
//             }}
//             aria-describedby="password-error"
//           />
//           <div className="input-header">
//             <label htmlFor="confirm-password">Confirm Password</label>
//             {errors.confirmPassword && (
//               <p style={{ color: "red" }} id="confirm-password-error">
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>
//           <input
//             id="confirm-password"
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => {
//               setConfirmPassword(e.target.value);
//               setErrors({ ...errors, confirmPassword: "" });
//             }}
//             aria-describedby="confirm-password-error"
//           />
//           {errorMessage && (
//             <div className="server-error-message">
//               <CgDanger />
//               {errorMessage}
//             </div>
//           )}
//           <button type="submit" className="sign-up-button">
//             Sign Up
//           </button>
//           <button type="button" className="google-sign-up-button">
//             <FaGoogle /> <span>Sign up with Google</span>
//           </button>
//         </form>
//       </div>
//       <div className="image-container">
//         <img src="/img/boat.gif" alt="Decorative boat animation" />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { registerUser } from "../api/userApi";
import "../styles/components/SignUp.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Стан для видимості пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Стан для видимості підтвердження пароля

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = { username, email, password };
        const res = await registerUser(userData);
        localStorage.setItem("token", res.token);
        window.location.reload();
        console.log(res.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setErrorMessage(error.response.data.message);
        }
      }
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
          <Link className="login-button" to={"/login"}>
            Log In
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
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
            onChange={e => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: "" });
            }}
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
            onChange={e => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
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
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Відповідно до стану видимості
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              aria-describedby="password-error"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="input-header">
            <label htmlFor="confirm-password">Confirm Password</label>
            {errors.confirmPassword && (
              <p style={{ color: "red" }} id="confirm-password-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="password-input-container">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"} // Відповідно до стану видимості
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                setErrors({ ...errors, confirmPassword: "" });
              }}
              aria-describedby="confirm-password-error"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errorMessage && (
            <div className="server-error-message">
              <CgDanger />
              {errorMessage}
            </div>
          )}
          <button type="submit" className="sign-up-button">
            Sign Up
          </button>
          <button type="button" className="google-sign-up-button">
            <FaGoogle /> <span>Sign up with Google</span>
          </button>
        </form>
      </div>
      <div className="image-container">
        {/* <img src="/img/boat.gif" alt="Decorative boat animation" /> */}
      </div>
    </div>
  );
}
