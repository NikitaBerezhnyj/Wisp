import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaSearch, FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { FaSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
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

  // Вихід з системи
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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

  return (
    <div className="navigation-container">
      <div className="navigation-items">
        <button
          className={currentPath === "/search" ? "active" : ""}
          onClick={() => (window.location.pathname = "/search")}
        >
          <FaSearch />
          <span>Search</span>
        </button>
        <button
          className={currentPath === "/" ? "active" : ""}
          onClick={() => (window.location.pathname = "/")}
        >
          <FaHome />
          <span>Home</span>
        </button>
        <button
          className={currentPath.startsWith("/profile") ? "active" : ""}
          onClick={() => (window.location.pathname = "/profile")}
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
            <button>
              <IoMdSettings /> Setting
            </button>
            <button
              onClick={() => {
                setActiveDarkTheme(!activeDarkTheme);
              }}
            >
              {activeDarkTheme ? <FaSun /> : <FaRegMoon />} Change Theme
            </button>
            <button
              onClick={() => {
                setShowReportBox(true);
              }}
            >
              <IoMdBug /> Report a Problem
            </button>
            <hr />
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              <ImExit /> SingOut
            </button>
          </div>
        )}
        {showReportBox && <ReportBox onClose={() => setShowReportBox(false)} />}
      </div>
    </div>
  );
}
