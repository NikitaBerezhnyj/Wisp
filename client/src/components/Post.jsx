import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GrLike, GrDislike } from "react-icons/gr";
import { FaRegCommentAlt } from "react-icons/fa";
import CommentList from "./CommentList";
import { likePost, dislikePost } from "../api/postApi";
import "../styles/components/Post.css";

export default function Post({ post }) {
  const [userId, setUserId] = useState(null);
  const [likeCounter, setLikeCounter] = useState(post.likes.length);
  const [dislikeCounter, setDislikeCounter] = useState(post.dislikes.length);
  const [commentsCounter, setCommentsCounter] = useState(post.comments.length);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const getIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }
    return null;
  };

  useEffect(() => {
    const id = getIdFromToken();
    setUserId(id);
    setLiked(post.likes.includes(id));
    setDisliked(post.dislikes.includes(id));
  }, [post.likes, post.dislikes]);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCounter(liked ? likeCounter - 1 : likeCounter + 1);
    if (disliked) {
      setDisliked(false);
      setDislikeCounter(dislikeCounter - 1);
    }
  };

  const handleDislikeClick = () => {
    setDisliked(!disliked);
    setDislikeCounter(disliked ? dislikeCounter - 1 : dislikeCounter + 1);
    if (liked) {
      setLiked(false);
      setLikeCounter(likeCounter - 1);
    }
  };

  const handleCommentsClick = () => {
    setShowComments(!showComments);
  };

  const closeComments = () => {
    setShowComments(false);
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img
          className="post-avatar"
          src={post.user.avatarImage}
          alt={`${post.user.username}'s Avatar`}
          onClick={() => {
            navigate(`/profile/${post.user.username}`);
          }}
        />
        <div className="post-user-info">
          <p
            className="post-username"
            onClick={() => {
              navigate(`/profile/${post.user.username}`);
            }}
          >
            {post.user.username}
          </p>
          <p className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="post-content">
        <p dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.postImage && (
          <img src={post.postImage} alt="Post" className="post-image" />
        )}
      </div>
      <div className="post-actions">
        <button
          className={`post-action-button ${liked ? "active" : ""}`}
          onClick={handleLikeClick}
        >
          <span>{likeCounter}</span>
          <GrLike />
        </button>
        <button
          className={`post-action-button ${disliked ? "active" : ""}`}
          onClick={handleDislikeClick}
        >
          <span>{dislikeCounter}</span>
          <GrDislike />
        </button>
        <button className="post-action-button" onClick={handleCommentsClick}>
          <span>{commentsCounter}</span>
          <FaRegCommentAlt />
        </button>
      </div>
      {showComments && (
        <CommentList comments={post.comments} onClose={closeComments} />
      )}
    </div>
  );
}
