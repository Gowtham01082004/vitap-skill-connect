// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I can help you with course information, assignment details, scheduling, or resources. What would you like to know about?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatboxRef = useRef(null);

  useEffect(() => {
    chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
  }, [messages, isTyping]);

  const sendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "https://skill-connect-project.onrender.com/chat",
        { message: text }
      );

      const botText =
        response?.data?.response && typeof response.data.response === "string"
          ? response.data.response
          : "Sorry, I couldn't understand that.";

      const botMessage = {
        sender: "bot",
        text: botText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("❌ Chat API Error:", err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble responding. Try again later.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div className="chatbot-full-container">
      <div className="chatbot-welcome">
        <h3>Welcome to VITAP SkillConnect AI!</h3>
        <p>
          I'm here to help with your academic questions, schedule planning,
          project information, and more. How can I assist you today?
        </p>
      </div>

      <div ref={chatboxRef} className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot">
            <div className="message-text">Typing...</div>
          </div>
        )}
      </div>

      {/* ✅ Form prevents page reload on Enter */}
      <form
        className="chatbot-input-area"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          id="chat-input"
          name="chat-input"
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" aria-label="Send Message">
          ➤
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
