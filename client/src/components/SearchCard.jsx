import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SearchCard.css";

export default function SearchCard({ username, countFollowers, userAvatar }) {
  const navigate = useNavigate();

  return (
    <div
      className="search-card"
      onClick={() => navigate(`/profile/${username}`)}
    >
      <div>
        <img src={userAvatar} alt="avatar" />
      </div>
      <div className="user-info">
        <p>{username}</p>
        <p>{countFollowers} Followers</p>
      </div>
    </div>
  );
}
