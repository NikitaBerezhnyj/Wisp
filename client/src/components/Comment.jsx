import React from "react";
import "../styles/components/Comment.css";

const Comment = ({ userDetails, comment }) => {
  if (!userDetails) return null;

  return (
    <div className="comment-container">
      <div className="comment-header">
        <img
          className="comment-avatar"
          src={userDetails.data.avatarImage}
          alt="Avatar"
        />
        <p className="comment-username">{userDetails.data.username}</p>
      </div>
      <div className="comment-body">
        <p className="comment-text">{comment.content}</p>
        <p className="comment-time">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
