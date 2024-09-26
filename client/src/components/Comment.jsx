import React from "react";
import "../styles/components/Comment.css";

export default function Comment() {
  return (
    <div className="comment-container">
      <div className="comment-header">
        <img
          className="comment-avatar"
          src="/img/portrait.jpg"
          alt="User Avatar"
        />
        <p className="comment-username">User Name</p>
      </div>
      <div className="comment-body">
        <p className="comment-text">Comment content</p>
        <p className="comment-time">Comment date</p>
      </div>
    </div>
  );
}
