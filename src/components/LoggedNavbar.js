import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import "./LoggedNavbar.css";

const LoggedNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔹 Handle Logout (Prevent Concurrent Updates)
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth", { replace: true }); // ✅ Fix: Redirect to /auth
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="logged-navbar">
      <h2>Skill Connect</h2>
      <div className="nav-links">
        <Link to="/logged-homepage" className="nav-link">
          Home
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <Link to="/requests-inbox" className="nav-link">
          Requests Inbox
        </Link>
        <Link to="/notifications" className="nav-link">
          Notifications
        </Link>
      </div>

      {/* ✅ Fix: Only show user email if user exists */}
      {user?.email && (
        <span className="user-info">Logged in as: {user.email}</span>
      )}

      {/* ✅ Fix: Add aria-label for accessibility */}
      <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
        Logout
      </button>
    </nav>
  );
};

export default LoggedNavbar;
