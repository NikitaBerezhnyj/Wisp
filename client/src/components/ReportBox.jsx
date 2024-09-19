import React, { useEffect, useRef, useState } from "react";
import { reportFromUser } from "../api/userApi";
import { IoMdClose } from "react-icons/io";
import "../styles/components/ReportBox.css";

export default function ReportBox({ onClose }) {
  const [text, setText] = useState("");
  const reportBoxRef = useRef(null);

  const handleTextChange = e => {
    const { value } = e.target;
    setText(value);
  };

  const handleClickOutside = event => {
    if (reportBoxRef.current && !reportBoxRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleReportSubmit = async () => {
    if (!text.trim()) return;

    const reportData = { message: text };

    try {
      await reportFromUser(reportData);
      console.log("Error report sent successfully");
      setText("");
      onClose();
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="report-box-container">
      <div className="report-box-wrap" ref={reportBoxRef}>
        <button
          className="report-box-close-button"
          onClick={() => {
            onClose();
          }}
        >
          <IoMdClose />
        </button>
        <h3>Report a Problem</h3>
        <textarea
          placeholder="Please write as complete a description of the error as possible..."
          onChange={handleTextChange}
          rows={12}
        ></textarea>
        <button
          className="report-box-send-button"
          disabled={!text.trim()}
          onClick={handleReportSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}
