import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo-container" onClick={() => navigate("/")}>
         
          <h1 className="logo-text">
            VIT-AP<span className="highlight" > SkillConnect</span>
          </h1>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <span
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span
            className={`nav-link ${isActive("/how-it-works") ? "active" : ""}`}
            onClick={() => navigate("/how-it-works")}
          >
            How It Works
          </span>
          <span
            className={`nav-link ${isActive("/faq") ? "active" : ""}`}
            onClick={() => navigate("/faq")}
          >
            FAQs
          </span>
          <span
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            onClick={() => navigate("/about")}
          >
            About Us
          </span>

          {user ? (
            <div className="user-section">
              <span className="user-name">👤 {user.email}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={() => navigate("/auth")}>
                Login
              </button>
              <button className="signup-btn" onClick={() => navigate("/auth")}>
                Sign Up
              </button>
            </div>
          )}
        </div>

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
