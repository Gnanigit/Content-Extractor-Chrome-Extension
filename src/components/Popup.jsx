import React, { useState } from "react";

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

  return (
    <div style={{ padding: "10px", width: "300px" }}>
      <h1>Content Extractor</h1>
      <button onClick={extractContent} style={{ marginBottom: "10px" }}>
        Extract Content
      </button>
      <textarea
        value={content}
        readOnly
        style={{ width: "100%", height: "200px" }}
      />
    </div>
  );
};

export default Popup;
