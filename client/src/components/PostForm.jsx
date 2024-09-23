import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

const emojis = {
  smileys: [
    "😂",
    "😍",
    "😁",
    "😢",
    "😠",
    "😎",
    "😞",
    "😱",
    "😏",
    "😘",
    "😬",
    "😄",
    "😇",
    "😑",
    "😜",
    "😵",
    "🤗",
    "😈",
    "😴",
    "🤔",
    "😮",
    "😅"
  ],
  reactions: ["👍", "👎", "👏", "🎉", "🥳", "🤩", "🤯", "😱", "💔", "😴"],
  sports: ["⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🏏", "🏓", "🎱"],
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🐻",
    "🐼",
    "🦁",
    "🐯",
    "🐘",
    "🐧",
    "🐬",
    "🦊",
    "🐸",
    "🦄"
  ],
  food: ["🍕", "🍔", "🍣", "🍩", "🍦", "🌭", "🍉", "🍏", "🍪", "🥑"],
  nature: ["🌈", "🌳", "🌼", "🌊", "🌞", "🌙", "🌌", "🏔️", "🍂", "🌻"],
  vehicles: ["🚗", "🚌", "🚕", "🚙", "✈️", "🚢", "🚎", "🚲", "🏍️", "🚀"],
  objects: ["💻", "📱", "⌚", "📷", "🔑", "💡", "🎒", "📅", "🧊", "🧭"],
  symbols: ["❤️", "⭐", "💯", "🔔", "⚡️", "🔞", "🚫", "✔️", "❌", "🔑"],
  fun: ["🎉", "🥳", "💩", "🚩", "🚀", "🎈", "🤹‍♂️", "🎭", "👾", "🪅"],
  hearts: ["❤️", "💛", "💚", "💙", "💜", "🧡", "🤎", "🖤", "💔", "💕"],
  countries: [
    "🇺🇦",
    "🇺🇸",
    "🇬🇧",
    "🇩🇪",
    "🇫🇷",
    "🇮🇹",
    "🇪🇸",
    "🇨🇦",
    "🇧🇷",
    "🇯🇵",
    "🇰🇷",
    "🇦🇺",
    "🇨🇳",
    "🇮🇳"
  ]
};

export default function PostForm() {
  const [emojiSvg, setEmojiSvg] = useState(getRandomEmojiSvg());
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formatting, setFormatting] = useState([]);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);

  // Функція для відкриття провідника файлів
  const handleAddMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Викликаємо натискання на прихований інпут
    }
  };

  // Функція для обробки вибору файлу
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Зберігаємо URL зображення
    }
  };

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username; // Замість цього використовуйте ключ, який відповідає імені користувача в токені
    }
    return null;
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id; // Замість цього використовуйте ключ, який відповідає імені користувача в токені
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

  function getRandomEmojiSvg() {
    const randomIconName =
      emojiNames[Math.floor(Math.random() * emojiNames.length)];
    return BsIcons[randomIconName]();
  }

  const handleTextChange = e => {
    const { value } = e.target;
    setText(value);
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

          // Видаляємо попереднє форматування для обраного фрагменту
          newFormatting = newFormatting.filter(
            f => !(f.start < end && f.end > start)
          );

          newFormatting.push({ start, end, [type]: true });

          return newFormatting;
        });
      }
    }

    // Слухач для відстеження введення тексту
    textarea.addEventListener("input", () => {
      const newCursorPosition = textarea.selectionStart;

      setFormatting(prevFormatting => {
        // Якщо нові символи вводяться після форматованого тексту, не застосовуємо форматування
        let updatedFormatting = [...prevFormatting];

        updatedFormatting = updatedFormatting.map(format => {
          // Якщо нові символи вводяться всередині форматованого тексту, зупиняємо форматування на цьому місці
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
        if (format.underline) style.textDecoration = "underline"; // Додаємо підкреслення

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

  const handleEmojiClick = emoji => {
    const textarea = textareaRef.current;
    const cursorPosition = textarea.selectionStart;

    const newText =
      text.slice(0, cursorPosition) + emoji + text.slice(cursorPosition);
    setText(newText);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        cursorPosition + emoji.length;
      textarea.focus();
    }, 0);

    setShowEmojiPicker(false);
  };

  const optimizeText = text => {
    // Створюємо HTML-теги з форматування
    let exportText = text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
      .replace(/_(.*?)_/g, "<i>$1</i>") // Italic
      .replace(/~(.*?)~/g, "<u>$1</u>"); // Underline

    // Додаємо тег <a> для посилань
    exportText = exportText.replace(
      /(?:(https?:\/\/|www\.)[^\s]+)/g,
      '<a href="$&" target="_blank">$&</a>'
    );

    // Видаляємо пусті теги
    exportText = exportText
      .replace(/<b>(\s*)<\/b>/g, "") // Видаляємо порожні <b>
      .replace(/<i>(\s*)<\/i>/g, "") // Видаляємо порожні <i>
      .replace(/<u>(\s*)<\/u>/g, "") // Видаляємо порожні <u>
      .replace(/<a>(\s*)<\/a>/g, ""); // Видаляємо порожні <a>

    // Виправляємо випадки, коли закриваючий тег йде без відкриваючого
    exportText = exportText
      .replace(/<b>(.*?)<\/b>(?=\s*<b>)/g, "$1") // Залишаємо текст між <b> і <b>
      .replace(/<i>(.*?)<\/i>(?=\s*<i>)/g, "$1") // Залишаємо текст між <i> і <i>
      .replace(/<u>(.*?)<\/u>(?=\s*<u>)/g, "$1") // Залишаємо текст між <u> і <u>
      .replace(/<a>(.*?)<\/a>(?=\s*<a>)/g, "$1"); // Залишаємо текст між <a> і <a>

    return exportText;
  };

  const formatPost = () => {
    let exportText = "";
    let lastIndex = 0;

    formatting
      .sort((a, b) => a.start - b.start)
      .forEach(format => {
        exportText += text.slice(lastIndex, format.start).replace(/\*/g, "");

        // Додаємо теги форматування
        if (format.bold) exportText += "<b>";
        if (format.italic) exportText += "<i>";
        if (format.underline) exportText += "<u>"; // Додаємо для підкреслення

        exportText += text.slice(format.start, format.end).replace(/\*/g, "");

        // Закриваємо теги форматування
        if (format.underline) exportText += "</u>"; // Закриваємо підкреслення
        if (format.italic) exportText += "</i>";
        if (format.bold) exportText += "</b>";

        lastIndex = format.end;
      });

    exportText += text.slice(lastIndex).replace(/\*/g, "");

    // Оптимізуємо текст
    exportText = optimizeText(exportText);
    console.log(exportText);
    return exportText;
  };

  const handleSubmitPost = async () => {
    try {
      let postImage = selectedImage; // Початково зберігаємо URL зображення

      // Якщо вибрано новий файл, спочатку завантажуємо його
      if (selectedImage && fileInputRef.current.files[0]) {
        const uploadResponse = await saveUploadFile(
          fileInputRef.current.files[0]
        );
        postImage = uploadResponse.filePath; // Отримуємо URL завантаженого файлу
      }

      if (postImage == null) {
        postImage = "";
      }

      const postContent = formatPost(); // Оптимізуємо текст поста, додаючи теги форматування

      // Формуємо об'єкт нового поста, що відповідає схемі бази даних
      const newPost = {
        user: getUserIdFromToken(), // Отримуємо ID користувача з JWT токену
        content: postContent, // Додаємо контент поста
        postImage: postImage // Додаємо зображення, якщо є
      };

      console.log("Post data being sent:", newPost);
      await createPost(newPost); // Викликаємо API для створення нового поста

      // Після успішного створення поста можна виконати дії, наприклад, очистити форму
      setText("");
      setSelectedImage(null);
      fileInputRef.current.value = null; // Очищаємо вибір файлу
    } catch (error) {
      console.error("Error creating post:", error); // Логування помилки
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
              // handle case when username is not found
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
      {/* Тут має з'явитись маленьке зображення
      <div>
        <img src="" alt="" id="selected-image" />
      </div> */}
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
          {/* <button className="post-form-tool-button" title="Add Media">
            <FaImage />
          </button> */}
          {/* Прихований input для вибору файлів */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />

          {/* Кнопка для додавання медіа */}
          <button
            className="post-form-tool-button"
            title="Add Media"
            onClick={handleAddMediaClick}
          >
            <FaImage />
          </button>
          {/*  */}
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
          <div className="emoji-picker">
            {Object.entries(emojis).map(([category, emojiList]) => (
              <div key={category} className="emoji-category">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                {emojiList.map((emoji, index) => (
                  <span
                    key={index}
                    className="emoji"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            ))}
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
