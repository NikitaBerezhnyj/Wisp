import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { addComment } from "../api/postApi";
import { jwtDecode } from "jwt-decode";
import "../styles/components/CommentForm.css";

export default function CommentForm({ postId }) {
  const [text, setText] = useState("");

  const handleTextChange = e => {
    const { value } = e.target;
    if (value.length <= 256) {
      setText(value);
    }
  };

  const getIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }
    return null;
  };

  const handleSubmit = async () => {
    const userId = getIdFromToken();
    const commentContent = text;
    await addComment(postId, userId, commentContent);
    setText("");
  };

  return (
    <div className="comment-form-container">
      <div className="comment-form-header">
        <img
          className="comment-form-avatar"
          src="/img/portrait.jpg"
          alt="User Avatar"
        />
        <div className="comment-form-body">
          <textarea
            className="comment-form-textarea"
            placeholder="Write a comment..."
            rows={1}
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <button
            className="comment-form-submit-button"
            onClick={handleSubmit}
            disabled={!text.trim()}
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
}
