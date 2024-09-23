import React, { useState, useRef, useEffect } from "react";
import "../styles/components/Settings.css";

export default function Settings() {
  return (
    <div className="settings-container">
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
    </div>
  );
}
