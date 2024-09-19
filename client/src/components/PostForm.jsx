import React, { useState, useEffect } from "react";
import { FaImage, FaList, FaBold, FaItalic } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import * as BsIcons from "react-icons/bs";
import "../styles/components/PostForm.css";

const emojis = [
  "BsEmojiAngry",
  "BsEmojiAstonished",
  "BsEmojiDizzy",
  "BsEmojiExpressionless",
  "BsEmojiFrown",
  "BsEmojiGrimace",
  "BsEmojiGrin",
  "BsEmojiHeartEyes",
  "BsEmojiKiss",
  "BsEmojiLaughing",
  "BsEmojiNeutral",
  "BsEmojiSmile",
  "BsEmojiSmileUpsideDown",
  "BsEmojiSunglasses",
  "BsEmojiSurprise",
  "BsEmojiTear",
  "BsEmojiWink"
];

export default function PostForm() {
  const [emoji, setEmoji] = useState(null);
  const [text, setText] = useState("");

  const randomEmoji = () => {
    const randomIcon = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(BsIcons[randomIcon]());
  };

  useEffect(randomEmoji, []);

  const handleTextChange = e => {
    const { value } = e.target;
    if (value.length <= 256) {
      setText(value);
    }
  };

  return (
    <div className="post-form-container">
      <div className="post-form-header">
        <img
          className="post-form-avatar"
          src="/img/portrait.jpg"
          alt="User Avatar"
        />
        <div className="textarea-wrapper">
          <textarea
            className="post-form-textarea"
            placeholder="What's on your mind?"
            rows={4}
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <p
            className={`post-form-character-counter ${
              text.length === 256 ? "max-length" : ""
            }`}
          >
            {text.length}/256
          </p>
        </div>
      </div>
      <div className="post-form-tool-footer">
        <div className="post-form-tools">
          <button className="post-form-tool-button" title="Add Image">
            <FaImage />
          </button>
          <button className="post-form-tool-button" title="Add GIF">
            <HiGif />
          </button>
          <button className="post-form-tool-button" title="Add List">
            <FaList />
          </button>
          <button className="post-form-tool-button" title="Bold Text">
            <FaBold />
          </button>
          <button className="post-form-tool-button" title="Italic Text">
            <FaItalic />
          </button>
          <button
            className="post-form-tool-button"
            title="Add Emoji"
            onClick={randomEmoji}
          >
            {emoji}
          </button>
        </div>
        <div className="post-form-footer">
          <button className="post-form-submit-button" disabled={!text.trim()}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
