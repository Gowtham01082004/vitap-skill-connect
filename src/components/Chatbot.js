import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    console.log("DeepSeek API Key:", process.env.REACT_APP_DEEPSEEK_API_KEY); // Debugging

    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [{ role: "user", content: input }],
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages([
        ...newMessages,
        {
          text: response.data.choices?.[0]?.message?.content || "No response",
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("DeepSeek API Error:", error);
      setMessages([
        ...newMessages,
        { text: "Error fetching response.", sender: "bot" },
      ]);
    }
    setLoading(false);
  };

  return (
    <div
      className="chat-container"
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div
        className="chat-box"
        style={{
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "10px",
          background: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px",
                borderRadius: "5px",
                background: msg.sender === "user" ? "#007bff" : "#e0e0e0",
                color: msg.sender === "user" ? "white" : "black",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ textAlign: "center" }}>Typing...</p>}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: "10px" }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px", marginLeft: "5px", cursor: "pointer" }}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
