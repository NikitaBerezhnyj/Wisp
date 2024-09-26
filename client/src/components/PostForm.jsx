import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Picker from "emoji-picker-react";
import { RichTextarea } from "rich-textarea";
import { jwtDecode } from "jwt-decode";
import { HiGif } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import { FaImage, FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { getUserProfile } from "../api/userApi";
import { saveUploadFile } from "../api/userApi";
import { createPost } from "../api/postApi";
import "../styles/components/PostForm.css";

const emojiNames = [
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
  const [emojiSvg] = useState(getRandomEmoji());
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formatting, setFormatting] = useState([]);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);

  const handleAddMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username;
    }
    return null;
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }
    return null;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = getUsernameFromToken();
        const data = await getUserProfile(username);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  function getRandomEmoji() {
    const randomIconName =
      emojiNames[Math.floor(Math.random() * emojiNames.length)];
    return BsIcons[randomIconName]();
  }

  const handleTextChange = e => {
    const { value } = e.target;
    if (value.length <= 256) {
      setText(value);
      setCharCount(value.length);
    }
  };

  const applyFormatting = type => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = text.slice(start, end);

      if (selectedText) {
        setFormatting(prevFormatting => {
          let newFormatting = [...prevFormatting];

          newFormatting = newFormatting.filter(
            f => !(f.start < end && f.end > start)
          );

          newFormatting.push({ start, end, [type]: true });

          return newFormatting;
        });
      }
    }

    textarea.addEventListener("input", () => {
      const newCursorPosition = textarea.selectionStart;

      setFormatting(prevFormatting => {
        let updatedFormatting = [...prevFormatting];

        updatedFormatting = updatedFormatting.map(format => {
          if (
            newCursorPosition < format.end &&
            newCursorPosition >= format.start
          ) {
            return { ...format, end: newCursorPosition };
          }
          return format;
        });

        return updatedFormatting;
      });
    });
  };

  const renderText = value => {
    let result = [];
    let lastIndex = 0;

    formatting
      .sort((a, b) => a.start - b.start)
      .forEach((format, index) => {
        if (format.start > lastIndex) {
          result.push(
            <span key={`text-${lastIndex}`}>
              {value.slice(lastIndex, format.start)}
            </span>
          );
        }

        const style = {};
        if (format.bold) style.fontWeight = "bold";
        if (format.italic) style.fontStyle = "italic";
        if (format.underline) style.textDecoration = "underline";

        result.push(
          <span key={`formatted-${index}`} style={style}>
            {value.slice(format.start, format.end)}
          </span>
        );

        lastIndex = format.end;
      });

    if (lastIndex < value.length) {
      result.push(
        <span key={`text-${lastIndex}`}>{value.slice(lastIndex)}</span>
      );
    }

    return <>{result}</>;
  };

  const handleEmojiClick = emojiObject => {
    const textarea = textareaRef.current;
    const cursorPosition = textarea.selectionStart;

    const newText =
      text.slice(0, cursorPosition) +
      emojiObject.emoji +
      text.slice(cursorPosition);
    setText(newText);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        cursorPosition + emoji.length;
      textarea.focus();
    }, 0);

    setShowEmojiPicker(false);
  };

  const optimizeText = text => {
    let exportText = text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/_(.*?)_/g, "<i>$1</i>")
      .replace(/~(.*?)~/g, "<u>$1</u>");

    exportText = exportText.replace(
      /(?:(https?:\/\/|www\.)[^\s]+)/g,
      '<a href="$&" target="_blank">$&</a>'
    );

    exportText = exportText
      .replace(/<b>(\s*)<\/b>/g, "")
      .replace(/<i>(\s*)<\/i>/g, "")
      .replace(/<u>(\s*)<\/u>/g, "")
      .replace(/<a>(\s*)<\/a>/g, "");

    exportText = exportText
      .replace(/<b>(.*?)<\/b>(?=\s*<b>)/g, "$1")
      .replace(/<i>(.*?)<\/i>(?=\s*<i>)/g, "$1")
      .replace(/<u>(.*?)<\/u>(?=\s*<u>)/g, "$1")
      .replace(/<a>(.*?)<\/a>(?=\s*<a>)/g, "$1");

    return exportText;
  };

  const formatPost = () => {
    let exportText = "";
    let lastIndex = 0;

    formatting
      .sort((a, b) => a.start - b.start)
      .forEach(format => {
        exportText += text.slice(lastIndex, format.start).replace(/\*/g, "");

        if (format.bold) exportText += "<b>";
        if (format.italic) exportText += "<i>";
        if (format.underline) exportText += "<u>";

        exportText += text.slice(format.start, format.end).replace(/\*/g, "");

        if (format.underline) exportText += "</u>";
        if (format.italic) exportText += "</i>";
        if (format.bold) exportText += "</b>";

        lastIndex = format.end;
      });

    exportText += text.slice(lastIndex).replace(/\*/g, "");

    exportText = optimizeText(exportText);
    console.log(exportText);
    return exportText;
  };

  const handleSubmitPost = async () => {
    try {
      let postImage = selectedImage;

      if (selectedImage && fileInputRef.current.files[0]) {
        const uploadResponse = await saveUploadFile(
          fileInputRef.current.files[0]
        );
        postImage = uploadResponse.filePath;
      }

      if (postImage == null) {
        postImage = "";
      }

      const postContent = formatPost();

      const newPost = {
        user: getUserIdFromToken(),
        content: postContent,
        postImage: postImage
      };

      console.log("Post data being sent:", newPost);
      await createPost(newPost);

      setText("");
      setSelectedImage(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="post-form-container">
      <div className="post-form-header">
        <img
          className="post-form-avatar"
          src={user.avatarImage}
          alt="avatar"
          onClick={() => {
            const username = getUsernameFromToken();
            if (username) {
              navigate("/profile/${username}");
            } else {
              console.error("Username not found in token");
            }
          }}
        />
        <div className="textarea-wrapper">
          <div className="textarea-placeholder">
            {text.length === 0 && "What is in your mind?"}
          </div>
          <RichTextarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            rows={4}
            style={{ width: "100%" }}
          >
            {renderText}
          </RichTextarea>
          <p
            className={`post-form-character-counter ${
              text.length === 256 ? "max-length" : ""
            }`}
          >
            {text.length}/256
          </p>
        </div>
      </div>
      {selectedImage && (
        <div className="post-form-selected-image">
          <img id="selected-image" src={selectedImage} alt="Selected" />
          <button
            onClick={() => {
              setSelectedImage(null);
            }}
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="post-form-tool-footer">
        <div className="post-form-tools">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button
            className="post-form-tool-button"
            title="Add Media"
            onClick={handleAddMediaClick}
          >
            <FaImage />
          </button>
          <button className="post-form-tool-button" title="Add GIF">
            <HiGif />
          </button>
          <button
            className="post-form-tool-button"
            title="Bold Text"
            onClick={() => applyFormatting("bold")}
          >
            <FaBold />
          </button>
          <button
            className="post-form-tool-button"
            title="Italic Text"
            onClick={() => applyFormatting("italic")}
          >
            <FaItalic />
          </button>
          <button
            className="post-form-tool-button"
            title="Add Underline"
            onClick={() => applyFormatting("underline")}
          >
            <FaUnderline />
          </button>
          <button
            className="post-form-tool-button"
            title="Add Emoji"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            {emojiSvg}
          </button>
        </div>
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <Picker
              width="100%"
              height="auto"
              native={true}
              lazyLoadEmojis={true}
              disableAutoFocus={true}
              skinTonesDisabled={true}
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}

        <div className="post-form-footer">
          <button
            className="post-form-submit-button"
            disabled={!text.trim()}
            onClick={handleSubmitPost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
