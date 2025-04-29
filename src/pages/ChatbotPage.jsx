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

      const botMessage = {
        sender: "bot",
        text: response.data.response,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
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
        <h3>Welcome to VITAssist AI!</h3>
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

      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatbotPage;
