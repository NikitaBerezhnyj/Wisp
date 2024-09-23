// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { FaHome, FaSearch, FaRegUser } from "react-icons/fa";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { IoMdSettings } from "react-icons/io";
// import { FaSun } from "react-icons/fa";
// import { FaRegMoon } from "react-icons/fa";
// import { IoMdBug } from "react-icons/io";
// import { ImExit } from "react-icons/im";
// import ReportBox from "./ReportBox";
// import "../styles/components/Navigation.css";

// export default function Navigation({ currentPath }) {
//   const [activeDarkTheme, setActiveDarkTheme] = useState(true);
//   const [showMoreMenu, setShowMoreMenu] = useState(false);
//   const [showReportBox, setShowReportBox] = useState(false);
//   const moreMenuRef = useRef(null);
//   const moreButtonRef = useRef(null);
//   const navigate = useNavigate();

//   const handleClickOutside = event => {
//     if (
//       moreMenuRef.current &&
//       !moreMenuRef.current.contains(event.target) &&
//       moreButtonRef.current &&
//       !moreButtonRef.current.contains(event.target)
//     ) {
//       setShowMoreMenu(false);
//     }
//   };

//   // Вихід з системи
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   // Отримання імені користувача з токена
//   const getUsernameFromToken = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       return decoded.username; // Замість цього використовуйте ключ, який відповідає імені користувача в токені
//     }
//     return null;
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark-theme", activeDarkTheme);
//     document.documentElement.classList.toggle("light-theme", !activeDarkTheme);
//   }, [activeDarkTheme]);

//   return (
//     <div className="navigation-container">
//       <div className="navigation-items">
//         <button
//           className={currentPath === "/search" ? "active" : ""}
//           // onClick={() => (window.location.pathname = "/search")}
//           onClick={() => navigate("/search")}
//         >
//           <FaSearch />
//           <span>Search</span>
//         </button>
//         <button
//           className={currentPath === "/" ? "active" : ""}
//           // onClick={() => (window.location.pathname = "/")}
//           onClick={() => navigate("/")}
//         >
//           <FaHome />
//           <span>Home</span>
//         </button>
//         <button
//           className={currentPath.startsWith("/profile") ? "active" : ""}
//           // onClick={() => (window.location.pathname = "/profile")}
//           onClick={() => {
//             const username = getUsernameFromToken();
//             if (username) {
//               navigate(`/profile/${username}`);
//             } else {
//               // handle case when username is not found
//               console.error("Username not found in token");
//             }
//           }}
//         >
//           <FaRegUser />
//           <span>Profile</span>
//         </button>
//       </div>
//       <div className="navigation-footer">
//         <button
//           ref={moreButtonRef}
//           onClick={() => setShowMoreMenu(!showMoreMenu)}
//         >
//           <RxHamburgerMenu />
//           <span>More</span>
//         </button>
//         {showMoreMenu && (
//           <div className="more-menu" ref={moreMenuRef}>
//             <button
//               onClick={() => {
//                 navigate("/settings");
//               }}
//             >
//               <IoMdSettings /> Settings
//             </button>
//             <button
//               onClick={() => {
//                 setActiveDarkTheme(!activeDarkTheme);
//               }}
//             >
//               {activeDarkTheme ? <FaSun /> : <FaRegMoon />} Change Theme
//             </button>
//             <button
//               onClick={() => {
//                 setShowReportBox(true);
//               }}
//             >
//               <IoMdBug /> Report a Problem
//             </button>
//             <hr />
//             <button
//               onClick={() => {
//                 handleLogout();
//               }}
//             >
//               <ImExit /> SingOut
//             </button>
//           </div>
//         )}
//         {showReportBox && <ReportBox onClose={() => setShowReportBox(false)} />}
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaHome, FaSearch, FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { FaSun, FaRegMoon } from "react-icons/fa";
import { IoMdBug } from "react-icons/io";
import { ImExit } from "react-icons/im";
import ReportBox from "./ReportBox";
import "../styles/components/Navigation.css";

export default function Navigation({ currentPath }) {
  const [activeDarkTheme, setActiveDarkTheme] = useState(true);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReportBox, setShowReportBox] = useState(false);
  const moreMenuRef = useRef(null);
  const moreButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = event => {
    if (
      moreMenuRef.current &&
      !moreMenuRef.current.contains(event.target) &&
      moreButtonRef.current &&
      !moreButtonRef.current.contains(event.target)
    ) {
      setShowMoreMenu(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username;
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", activeDarkTheme);
    document.documentElement.classList.toggle("light-theme", !activeDarkTheme);
  }, [activeDarkTheme]);

  const usernameFromToken = getUsernameFromToken();

  return (
    <div className="navigation-container">
      <div className="navigation-items">
        <button
          className={currentPath === "/search" ? "active" : ""}
          onClick={() => navigate("/search")}
        >
          <FaSearch />
          <span>Search</span>
        </button>
        <button
          className={currentPath === "/" ? "active" : ""}
          onClick={() => navigate("/")}
        >
          <FaHome />
          <span>Home</span>
        </button>
        <button
          className={
            currentPath === `/profile/${usernameFromToken}` ? "active" : ""
          }
          onClick={() => {
            if (usernameFromToken) {
              navigate(`/profile/${usernameFromToken}`);
            } else {
              console.error("Username not found in token");
            }
          }}
        >
          <FaRegUser />
          <span>Profile</span>
        </button>
      </div>
      <div className="navigation-footer">
        <button
          ref={moreButtonRef}
          onClick={() => setShowMoreMenu(!showMoreMenu)}
        >
          <RxHamburgerMenu />
          <span>More</span>
        </button>
        {showMoreMenu && (
          <div className="more-menu" ref={moreMenuRef}>
            <button onClick={() => navigate("/settings")}>
              <IoMdSettings /> Settings
            </button>
            <button onClick={() => setActiveDarkTheme(!activeDarkTheme)}>
              {activeDarkTheme ? <FaSun /> : <FaRegMoon />} Change Theme
            </button>
            <button onClick={() => setShowReportBox(true)}>
              <IoMdBug /> Report a Problem
            </button>
            <hr />
            <button onClick={handleLogout}>
              <ImExit /> SignOut
            </button>
          </div>
        )}
        {showReportBox && <ReportBox onClose={() => setShowReportBox(false)} />}
      </div>
    </div>
  );
}
