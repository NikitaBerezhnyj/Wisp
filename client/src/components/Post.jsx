// // import React, { useState } from "react";
// // import { GrLike, GrDislike } from "react-icons/gr";
// // import { FaRegCommentAlt } from "react-icons/fa";
// // import Comments from "./Comments";
// // import "../styles/components/Post.css";

// // export default function Post() {
// //   const [likeCounter, setLikeCounter] = useState(0);
// //   const [dislikeCounter, setDislikeCounter] = useState(0);
// //   const [commentsCounter, setCommentsCounter] = useState(0);

// //   const [liked, setLiked] = useState(false);
// //   const [disliked, setDisliked] = useState(false);

// //   const handleLikeClick = () => {
// //     setLiked(!liked);
// //     setLikeCounter(liked ? likeCounter - 1 : likeCounter + 1);
// //     if (disliked) {
// //       setDisliked(false);
// //       setDislikeCounter(dislikeCounter - 1);
// //     }
// //   };

// //   const handleDislikeClick = () => {
// //     setDisliked(!disliked);
// //     setDislikeCounter(disliked ? dislikeCounter - 1 : dislikeCounter + 1);
// //     if (liked) {
// //       setLiked(false);
// //       setLikeCounter(likeCounter - 1);
// //     }
// //   };

// //   return (
// //     <div className="post-container">
// //       <div className="post-header">
// //         <img
// //           className="post-avatar"
// //           src="/img/portrait.jpg"
// //           alt="User Avatar"
// //         />
// //         <div className="post-user-info">
// //           <p className="post-username">Username</p>
// //           <p className="post-date">Date</p>
// //         </div>
// //       </div>
// //       <div className="post-content">
// //         <p>
// //           Content <a href="#">link</a>
// //         </p>
// //         {/* <img src="/img/boat.gif" alt="img" /> */}
// //       </div>
// //       <div className="post-actions">
// //         <button
// //           // className="post-action-button"
// //           className={`post-action-button ${liked ? "active" : ""}`}
// //           onClick={() => handleLikeClick()}
// //         >
// //           <span>{likeCounter}</span>
// //           <GrLike />
// //         </button>
// //         <button
// //           // className="post-action-button"
// //           className={`post-action-button ${disliked ? "active" : ""}`}
// //           onClick={() => handleDislikeClick()}
// //         >
// //           <span>{dislikeCounter}</span>
// //           <GrDislike />
// //         </button>
// //         <button className="post-action-button">
// //           <span>{commentsCounter}</span>
// //           <FaRegCommentAlt />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { GrLike, GrDislike } from "react-icons/gr";
// import { FaRegCommentAlt } from "react-icons/fa";
// import Comments from "./Comments";
// import "../styles/components/Post.css";

// export default function Post() {
//   const [likeCounter, setLikeCounter] = useState(0);
//   const [dislikeCounter, setDislikeCounter] = useState(0);
//   const [commentsCounter, setCommentsCounter] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [showComments, setShowComments] = useState(false); // Новий стан для відображення коментарів

//   const handleLikeClick = () => {
//     setLiked(!liked);
//     setLikeCounter(liked ? likeCounter - 1 : likeCounter + 1);
//     if (disliked) {
//       setDisliked(false);
//       setDislikeCounter(dislikeCounter - 1);
//     }
//   };

//   const handleDislikeClick = () => {
//     setDisliked(!disliked);
//     setDislikeCounter(disliked ? dislikeCounter - 1 : dislikeCounter + 1);
//     if (liked) {
//       setLiked(false);
//       setLikeCounter(likeCounter - 1);
//     }
//   };

//   const handleCommentsClick = () => {
//     setShowComments(!showComments); // Перемикання видимості коментарів
//   };

//   return (
//     <div className="post-container">
//       <div className="post-header">
//         <img
//           className="post-avatar"
//           src="/img/portrait.jpg"
//           alt="User Avatar"
//         />
//         <div className="post-user-info">
//           <p className="post-username">Username</p>
//           <p className="post-date">Date</p>
//         </div>
//       </div>
//       <div className="post-content">
//         <p>
//           Content <a href="#">link</a>
//         </p>
//         {/* <img src="/img/boat.gif" alt="img" /> */}
//       </div>
//       <div className="post-actions">
//         <button
//           className={`post-action-button ${liked ? "active" : ""}`}
//           onClick={handleLikeClick}
//         >
//           <span>{likeCounter}</span>
//           <GrLike />
//         </button>
//         <button
//           className={`post-action-button ${disliked ? "active" : ""}`}
//           onClick={handleDislikeClick}
//         >
//           <span>{dislikeCounter}</span>
//           <GrDislike />
//         </button>
//         <button
//           className="post-action-button"
//           onClick={handleCommentsClick} // Додати обробник кліку для коментарів
//         >
//           <span>{commentsCounter}</span>
//           <FaRegCommentAlt />
//         </button>
//       </div>
//       {showComments && <Comments />}{" "}
//       {/* Умовне відображення компонента Comments */}
//     </div>
//   );
// }

import React, { useState } from "react";
import { GrLike, GrDislike } from "react-icons/gr";
import { FaRegCommentAlt } from "react-icons/fa";
import CommentList from "./CommentList";
import "../styles/components/Post.css";

export default function Post() {
  const [likeCounter, setLikeCounter] = useState(0);
  const [dislikeCounter, setDislikeCounter] = useState(0);
  const [commentsCounter, setCommentsCounter] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showComments, setShowComments] = useState(false);

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
          src="/img/portrait.jpg"
          alt="User Avatar"
        />
        <div className="post-user-info">
          <p className="post-username">Username</p>
          <p className="post-date">Date</p>
        </div>
      </div>
      <div className="post-content">
        <p>
          Content <a href="#">link</a>
        </p>
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
      {showComments && <CommentList onClose={closeComments} />}
    </div>
  );
}
