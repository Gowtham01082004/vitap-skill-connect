import React, { useState } from "react";
import "./AskQuestionModal.css";
import { v4 as uuidv4 } from "uuid";

const AskQuestionModal = ({ onClose, onSubmit, username }) => {
  const [questionType, setQuestionType] = useState("Academic Issue");
  const [subTitle, setSubTitle] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = () => {
    const newQuestion = {
      id: uuidv4(),
      questionType,
      subTitle,
      title,
      summary,
      postedAt: new Date().toLocaleString(),
      username,
      replies: 0,
    };
    onSubmit(newQuestion);
    onClose();
  };

  const subOptions = {
    "Academic Issue": ["Course Registration", "Grading Queries"],
    "Technical Help": ["GitHub Issues", "VITAssist Portal"],
    "Career & Placement": ["Internships", "Certificates"],
  };

  return (
    <div className="ask-modal-backdrop">
      <div className="ask-modal">
        <h2>Ask a New Question</h2>

        <label>Question Type</label>
        <select
          value={questionType}
          onChange={(e) => {
            setQuestionType(e.target.value);
            setSubTitle("");
          }}
        >
          {Object.keys(subOptions).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <label>Subtitle</label>
        <select value={subTitle} onChange={(e) => setSubTitle(e.target.value)}>
          <option value="" disabled>
            Select Subtitle
          </option>
          {subOptions[questionType].map((sub) => (
            <option key={sub}>{sub}</option>
          ))}
        </select>

        <label>Question Title</label>
        <input
          type="text"
          placeholder="Enter your question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Summary</label>
        <textarea
          placeholder="Explain your question briefly..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <div className="ask-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Post Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;
