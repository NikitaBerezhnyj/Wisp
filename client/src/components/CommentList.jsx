import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { getUserById } from "../api/userApi";
import "../styles/components/CommentList.css";

export default function CommentList({ comments, onClose, postId }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const usersData = {};
      await Promise.all(
        comments.map(async comment => {
          if (!usersData[comment.user]) {
            try {
              const data = await getUserById(comment.user);
              usersData[comment.user] = data;
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          }
        })
      );
      setUserDetails(usersData);
    };

    fetchUserDetails();
  }, [comments]);

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
        <CommentForm postId={postId} />
        {comments.length === 0 ? (
          <h3 className="no-comments">
            There are no comments yet. <br />
            You can be the first ;)
          </h3>
        ) : (
          comments.map((comment, index) => (
            <Comment
              key={index}
              userDetails={userDetails[comment.user]}
              comment={comment}
            />
          ))
        )}
      </div>
    </div>
  );
}
