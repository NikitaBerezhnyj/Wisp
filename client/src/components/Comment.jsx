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
        <p className="comment-text">
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          id faucibus justo. Aliquam non mi in arcu mattis maximus. Nullam
          venenatis magna sed lacinia ultricies. Vivamus tincidunt sagittis
          magna, at elementum metus ultrices nec. Morbi blandit magna magna, non
          pellentesque enim tincidunt a. Maecenas tempus mauris vel fringilla
          varius. Fusce blandit fringilla volutpat. Sed aliquet hendrerit arcu,
          non aliquam magna consequat et. Pellentesque orci lacus, convallis
          condimentum pretium eget, scelerisque a purus. Integer aliquam
          vulputate molestie. Aenean felis leo, maximus in commodo a, fringilla
          id lacus. Ut aliquet aliquam ipsum vitae posuere. Morbi lacinia
          vehicula ultricies. */}
          Comment content
        </p>
        <p className="comment-time">Comment date</p>
      </div>
    </div>
  );
}
