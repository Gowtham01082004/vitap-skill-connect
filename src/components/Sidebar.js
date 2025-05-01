// src/components/Sidebar.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import "./Sidebar.css";

const Sidebar = ({ isMobileSidebarVisible, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [collapsed] = useState(false);
  const sidebarRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) toggleSidebar();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth <= 768 &&
        isMobileSidebarVisible
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSidebarVisible, toggleSidebar]);

  return (
    <>
      {isMobileSidebarVisible && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <div
        ref={sidebarRef}
        className={`sidebar-container ${collapsed ? "collapsed" : ""} ${
          isMobileSidebarVisible ? "show" : ""
        }`}
      >
        <aside className="sidebar">
          <div className="sidebar-nav">
            <div className="nav-section">
              {!collapsed && <div className="nav-section-title">Main</div>}
              <ul className="nav-items">
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/dashboard") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/dashboard")}
                  >
                    📊 {!collapsed && "Dashboard"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/logged-homepage") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/logged-homepage")}
                  >
                    🔍 {!collapsed && "Join Projects"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/create-post") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/create-post")}
                  >
                    📝 {!collapsed && "Create Project"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/my-projects") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/my-projects")}
                  >
                    📂 {!collapsed && "My Projects"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/requests-inbox") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/requests-inbox")}
                  >
                    📥 {!collapsed && "Requests Inbox"}
                  </div>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              {!collapsed && (
                <div className="nav-section-title">Extra Tools</div>
              )}
              <ul className="nav-items">
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/chatbotpage") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/chatbotpage")}
                  >
                    🤖 {!collapsed && "AI Chatbot"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/cgpa-calculator") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/cgpa-calculator")}
                  >
                    📈 {!collapsed && "CGPA Calculator"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/roadmap") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/roadmap")}
                  >
                    🗺️ {!collapsed && "Roadmap"}
                  </div>
                </li>

                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/attendance-calculator") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/attendance-calculator")}
                  >
                    🧮 {!collapsed && "Attendance Calculator"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/view-pyq") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/view-pyq")}
                  >
                    📚 {!collapsed && "View PYQs"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link"
                    onClick={() => setInterviewOpen(!interviewOpen)}
                  >
                    🎓 {!collapsed && "Interview Prep"}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      isActive("/disc-for") ? "active" : ""
                    }`}
                    onClick={() => handleNavigate("/disc-for")}
                  >
                    📈 {!collapsed && "Discussion Forum"}
                  </div>
                </li>
                {interviewOpen && !collapsed && (
                  <ul className="dropdown-items">
                    <li
                      className="nav-item"
                      onClick={() => handleNavigate("/interview-prep/oop")}
                    >
                      → OOPs
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => handleNavigate("/interview-prep/dbms")}
                    >
                      → DBMS
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => handleNavigate("/interview-prep/dsa")}
                    >
                      → DSA
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => handleNavigate("/interview-prep/cn")}
                    >
                      → CN
                    </li>
                  </ul>
                )}
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
                    onClick={() => handleNavigate("/profile")}
                  >
                    👤 {!collapsed && "Profile"}
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">⚙ {!collapsed && "Settings"}</div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handleLogout}>
                    📤 {!collapsed && "Log Out"}
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
