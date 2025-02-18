import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2>SkillConnect</h2>
        <p>Connecting students, fostering collaboration</p>
      </div>
      <div className="footer-links">
        <h3>Features</h3>
        <ul>
          <li>Profile Creation</li>
          <li>AI Chat Assistant</li>
          <li>Team Formation</li>
          <li>Discussion Forum</li>
        </ul>
      </div>
      <div className="footer-links">
        <h3>Resources</h3>
        <ul>
          <li>Documentation</li>
          <li>API Reference</li>
          <li>Support</li>
          <li>Community</li>
        </ul>
      </div>
      <div className="footer-social">
        <h3>Connect</h3>
        <span>🐦 GitHub | LinkedIn | Twitter</span>
      </div>
    </footer>
  );
};

export default Footer;
