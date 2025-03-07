import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* 📌 Logo Section */}
        <div className="navbar-logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>

        {/* 📍 Navigation Links */}
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <span className="nav-link" onClick={() => navigate("/")}>
            Home
          </span>
          <span className="nav-link" onClick={() => navigate("/how-it-works")}>
            How It Works
          </span>
          <span className="nav-link" onClick={() => navigate("/faq")}>
            FAQs
          </span>
          <span className="nav-link" onClick={() => navigate("/about")}>
            About Us
          </span>
          <span
            className="nav-link ai-chatbot-link"
            onClick={() => navigate("/chatbot")}
          >
            AI Chatbot
          </span>

          {/* 🔑 Auth Section */}
          {user ? (
            <div className="user-section">
              <span className="user-name">👤 {user.email}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              {/* ✅ Redirects to `/auth` page completely */}
              <button className="login-btn" onClick={() => navigate("/auth")}>
                Login
              </button>
              <button className="signup-btn" onClick={() => navigate("/auth")}>
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
