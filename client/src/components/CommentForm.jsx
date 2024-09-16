// // import React, { useState } from "react";
// // import "../styles/components/CommentForm.css";

// // export default function CommentForm() {
// //   const [text, setText] = useState("");

// //   const handleTextChange = (e) => {
// //     const { value } = e.target;
// //     if (value.length <= 256) {
// //       setText(value);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     // Handle comment submission
// //     console.log("Comment submitted:", text);
// //     setText(""); // Clear the text area after submission
// //   };

// //   return (
// //     <div className="comment-form-container">
// //       <div className="comment-form-header">
// //         <img
// //           className="comment-form-avatar"
// //           src="/img/portrait.jpg"
// //           alt="User Avatar"
// //         />
// //         <textarea
// //           className="comment-form-textarea"
// //           placeholder="Write a comment..."
// //           rows={4}
// //           value={text}
// //           onChange={handleTextChange}
// //         ></textarea>
// //         <p
// //           className={`comment-form-character-counter ${
// //             text.length === 256 ? "max-length" : ""
// //           }`}
// //         >
// //           {text.length}/256
// //         </p>
// //       </div>
// //       <div className="comment-form-footer">
// //         <button className="comment-form-submit-button" onClick={handleSubmit}>
// //           Post
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { IoMdSend } from "react-icons/io";
// import "../styles/components/CommentForm.css";

// export default function CommentForm() {
//   const [text, setText] = useState("");

//   const handleTextChange = (e) => {
//     const { value } = e.target;
//     if (value.length <= 256) {
//       setText(value);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle comment submission
//     console.log("Comment submitted:", text);
//     setText(""); // Clear the text area after submission
//   };

//   return (
//     <div className="comment-form-container">
//       <div className="comment-form-header">
//         <img
//           className="comment-form-avatar"
//           src="/img/portrait.jpg"
//           alt="User Avatar"
//         />
//         <div className="comment-form-body">
//           <div className="comment-form-textarea-wrapper">
//             <textarea
//               className="comment-form-textarea"
//               placeholder="Write a comment..."
//               rows={2}
//               value={text}
//               onChange={handleTextChange}
//             ></textarea>
//           </div>
//           <div className="comment-form-footer">
//             <button
//               className="comment-form-submit-button"
//               onClick={handleSubmit}
//             >
//               <IoMdSend />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import "../styles/components/CommentForm.css";

export default function CommentForm() {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    const { value } = e.target;
    if (value.length <= 256) {
      setText(value);
    }
  };

  const handleSubmit = () => {
    // Handle comment submission
    console.log("Comment submitted:", text);
    setText(""); // Clear the text area after submission
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
