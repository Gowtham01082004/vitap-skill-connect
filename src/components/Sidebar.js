import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // 👈 Manage chatbot modal

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <>
      <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
        <aside className="sidebar">
          <div
            className={`hamburger ${collapsed ? "collapsed" : ""}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="sidebar-nav">
            <div className="nav-section">
              {!collapsed && <div className="nav-section-title">Main</div>}
              <ul className="nav-items">
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/dashboard") ? "active" : ""
                    }`}
                    onClick={() => navigate("/dashboard")}
                  >
                    <span className="nav-icon">📊</span>
                    {!collapsed && "Dashboard"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/logged-homepage") ? "active" : ""
                    }`}
                    onClick={() => navigate("/logged-homepage")}
                  >
                    <span className="nav-icon">🔍</span>
                    {!collapsed && "Join Projects"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/create-post") ? "active" : ""
                    }`}
                    onClick={() => navigate("/create-post")}
                  >
                    <span className="nav-icon">📝</span>
                    {!collapsed && "Create Project"}
                  </div>
                </li>

                {/* 🔥 Open Chatbot Modal */}
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/chatbotpage") ? "active" : ""
                    }`}
                    onClick={() => navigate("/chatbotpage")}
                  >
                    <span className="nav-icon">🤖</span>
                    {!collapsed && "AI Chatbot"}
                  </div>
                </li>

                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/requests-inbox") ? "active" : ""
                    }`}
                    onClick={() => navigate("/requests-inbox")}
                  >
                    <span className="nav-icon">📥</span>
                    {!collapsed && "Requests Inbox"}
                  </div>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              {!collapsed && <div className="nav-section-title">Account</div>}
              <ul className="nav-items">
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/profile") ? "active" : ""
                    }`}
                    onClick={() => navigate("/profile")}
                  >
                    <span className="nav-icon">👤</span>
                    {!collapsed && "Profile"}
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <span className="nav-icon">⚙</span>
                    {!collapsed && "Settings"}
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <span className="nav-icon">🔒</span>
                    {!collapsed && "Privacy"}
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handleLogout}>
                    <span className="nav-icon">📤</span>
                    {!collapsed && "Log Out"}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
