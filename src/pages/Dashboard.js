import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setProfile(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't respond. Try again later." },
      ]);
    }

    setIsTyping(false);
  };

  if (!user || loading || !profile) return <LoadingScreen />;

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="dashboard-header">
          <h2>Welcome Back, {profile?.name} 👋</h2>
          <p>Connect, collaborate, and create with VITAP SkillConnect tools.</p>
        </div>

        <div className="stats-row">
          <div className="stat-card primary">
            <div className="stat-card-header">
              <div className="stat-card-title">AI CHATBOT</div>
              <div className="stat-card-icon">🤖</div>
            </div>
            <div className="stat-value">Ask Me</div>
            <div className="stat-meta">Get instant help with your queries</div>
          </div>

          <div
            className="stat-card secondary"
            onClick={() => navigate("/logged-homepage")}
          >
            <div className="stat-card-header">
              <div className="stat-card-title">JOIN PROJECTS</div>
              <div className="stat-card-icon">🔍</div>
            </div>
            <div className="stat-value">{posts.length}</div>
            <div className="stat-meta">Available projects to join</div>
          </div>

          <div
            className="stat-card tertiary"
            onClick={() => navigate("/create-post")}
          >
            <div className="stat-card-header">
              <div className="stat-card-title">RECRUIT TALENT</div>
              <div className="stat-card-icon">👥</div>
            </div>
            <div className="stat-value">Post</div>
            <div className="stat-meta">Find team members for your project</div>
          </div>

          <div
            className="stat-card success"
            onClick={() => navigate("/my-projects")}
          >
            <div className="stat-card-header">
              <div className="stat-card-title">MY PROJECTS</div>
              <div className="stat-card-icon">📂</div>
            </div>
            <div className="stat-value">View</div>
            <div className="stat-meta">See projects you've posted</div>
          </div>
        </div>

        {/* Row for chatbot and quick actions */}
        <div className="chat-quick-container">
          {/* Chatbot */}
          <div className="card chatbot-card">
            <div className="card-header">
              <div className="card-title">VITAP SkillConnect Chatbot</div>
            </div>
            <div className="chatbot-body">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && <div className="chat-message bot">...</div>}
            </div>
            <div className="chatbot-input-row">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card quick-actions-card">
            <div className="card-header">
              <div className="card-title">Quick Actions</div>
            </div>
            <div className="quick-actions-grid">
              <div
                className="quick-action browse"
                onClick={() => navigate("/logged-homepage")}
              >
                <div className="icon">🔍</div>
                <div className="title">Browse Projects</div>
                <div className="desc">Find projects that match your skills</div>
              </div>
              <div
                className="quick-action create"
                onClick={() => navigate("/create-post")}
              >
                <div className="icon">📝</div>
                <div className="title">Create Project</div>
                <div className="desc">Start your own project</div>
              </div>
              <div
                className="quick-action teammates"
                onClick={() => navigate("/logged-homepage")}
              >
                <div className="icon">👥</div>
                <div className="title">Find Teammates</div>
                <div className="desc">Recruit talent for your projects</div>
              </div>
              <div
                className="quick-action notify"
                onClick={() => navigate("/notifications")}
              >
                <div className="icon">🔔</div>
                <div className="title">Notifications</div>
                <div className="desc">3 new project invitations</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
