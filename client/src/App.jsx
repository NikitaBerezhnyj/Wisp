import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Base.css";

function App() {
  const location = useLocation();
  const user = localStorage.getItem("token");

  return (
    <div className="App">
      {user ? ( // Якщо токен є, показуємо основні сторінки
        <>
          <Header />
          <Navigation currentPath={location.pathname} />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        // Якщо токена немає, перенаправляємо на сторінку логіну/реєстрації
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
