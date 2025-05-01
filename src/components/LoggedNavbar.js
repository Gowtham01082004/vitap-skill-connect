import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import "./LoggedNavbar.css";

const LoggedNavbar = ({ onSidebarToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="vit-header">
      <div className="header-container">
        {/* Hamburger (only on mobile) */}
        <div className="nav-hamburger" onClick={onSidebarToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Logo */}
        <Link to="/dashboard" className="logo">
          <span className="logo-icon">🎓</span>
          <h1>
            VIT<span className="highlight">Assist</span>
          </h1>
        </Link>

        {/* Right Section */}
        <div className="header-right">
          <div
            className="notification-icon"
            onClick={() => navigate("/notifications")}
          >
            🔔
          </div>

          <div className="user-menu" onClick={() => navigate("/profile")}>
            <div className="user-avatar">
              {user?.displayName?.[0] || user?.email?.[0] || "U"}
            </div>
            <div className="user-name">{user?.displayName || user?.email}</div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default LoggedNavbar;
