import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "../styles/components/CommentList.css";

export default function CommentList({ onClose }) {
  const [comments, setComments] = useState(["asd", "asd"]);

  const handleClickOutside = event => {
    if (event.target.classList.contains("comments-container")) {
      onClose();
    }
  };

  return (
    <div className="comments-container" onClick={handleClickOutside}>
      <button className="comment-close-button" onClick={onClose}>
        <IoMdClose />
      </button>
      <div className="comments-wrap">
        <CommentForm />
        {comments.length === 0 ? (
          <h3 className="no-comments">
            There are no comments yet. <br />
            You can be the first ;)
          </h3>
        ) : (
          comments.map((comment, index) => <Comment key={index} {...comment} />)
        )}
      </div>
    </div>
  );
}
