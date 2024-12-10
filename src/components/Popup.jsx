import React, { useState } from "react";
import "./Popup.css"; // Import the external CSS file

const Popup = () => {
  const [content, setContent] = useState("");

  const extractContent = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => document.body.innerText,
        },
        (results) => {
          if (results && results[0]) setContent(results[0].result);
        }
      );
    } catch (error) {
      console.error("Error extracting content:", error);
    }
  };

  const copyToClipboard = () => {
    if (content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          alert("Content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Error copying content:", err);
        });
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-box">
        <h1 className="popup-title">Text Extractor</h1>
        <div className="popup-actions">
          <button className="popup-button" onClick={extractContent}>
            <span>Extract Text</span>
          </button>
          <button className="popup-button" onClick={copyToClipboard}>
            <span>Copy Text</span>
          </button>
        </div>
        <textarea
          className="popup-textarea"
          value={content}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Popup;
