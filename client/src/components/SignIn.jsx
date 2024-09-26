// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import { CgDanger } from "react-icons/cg";
// import { loginUser } from "../api/userApi";
// import "../styles/components/SignIn.css";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

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

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const userData = { email, password };
//         const res = await loginUser(userData);
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
//     <div className="sign-in-wrapper">
//       <div className="form-container">
//         <div className="form-container-header">
//           <h2>Sign In</h2>
//         </div>
//         <p className="registration-prompt">
//           Don't have an account?{" "}
//           <Link className="register-button" to={"/signup"}>
//             Register
//           </Link>
//         </p>
//         <form onSubmit={handleSubmit}>
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
//           <p className="forgot-password-link">
//             <Link to={"/forgot-password"}>Forgot password?</Link>
//           </p>
//           {errorMessage && (
//             <div className="server-error-message">
//               <CgDanger />
//               {errorMessage}
//             </div>
//           )}
//           <button type="submit" className="sign-in-button">
//             Sign In
//           </button>
//           <button type="button" className="google-sign-in-button">
//             <FaGoogle /> <span>Sign in with Google</span>
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
import { loginUser } from "../api/userApi";
import "../styles/components/SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Стан для видимості пароля

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = { email, password };
        const res = await loginUser(userData);
        localStorage.setItem("token", res.data);
        window.location.reload();
        console.log(res.message);
        console.log("Token: " + res.data);
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
    <div className="sign-in-wrapper">
      <div className="form-container">
        <div className="form-container-header">
          <h2>Sign In</h2>
        </div>
        <p className="registration-prompt">
          Don't have an account?{" "}
          <Link className="register-button" to={"/signup"}>
            Register
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
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
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <p className="forgot-password-link">
            <Link to={"/forgot-password"}>Forgot password?</Link>
          </p>
          {errorMessage && (
            <div className="server-error-message">
              <CgDanger />
              {errorMessage}
            </div>
          )}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          <button type="button" className="google-sign-in-button">
            <FaGoogle /> <span>Sign in with Google</span>
          </button>
        </form>
      </div>
      <div className="image-container"></div>
    </div>
  );
}
