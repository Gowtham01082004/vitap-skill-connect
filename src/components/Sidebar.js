import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <div className="sidebar-nav">
          {/* Main Section */}
          <div className="nav-section">
            <div className="nav-section-title">Main</div>
            <ul className="nav-items">
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => navigate("/dashboard")}
                >
                  <span className="nav-icon">📊</span> Dashboard
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => navigate("/logged-homepage")}
                >
                  <span className="nav-icon">🔍</span> Join Projects
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => navigate("/create-post")}
                >
                  <span className="nav-icon">📝</span> Create Project
                </div>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <ul className="nav-items">
              <li className="nav-item">
                <div className="nav-link" onClick={() => navigate("/profile")}>
                  <span className="nav-icon">👤</span> Profile
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <span className="nav-icon">⚙</span> Settings
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <span className="nav-icon">🔒</span> Privacy
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link" onClick={handleLogout}>
                  <span className="nav-icon">📤</span> Log Out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
