import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-v2">
      <div className="footer-container-v2">
        <div className="footer-info-v2">
          <div className="footer-logo-v2">
            <span role="img" aria-label="logo">
              🎓
            </span>
            <h3 className="brand-title">
              VITAP<span>SkillConnect</span>
            </h3>
          </div>
          <p>
            SkillConnect is a comprehensive platform designed to support VIT-AP
            students and faculty with AI-powered assistance, project
            collaboration opportunities, and academic resources.
          </p>
          <div className="social-links-v2">
            <a href="https://www.youtube.com/" className="social-link-v2">
              f
            </a>
            <a href="https://www.youtube.com/" className="social-link-v2">
              t
            </a>
            <a href="https://www.youtube.com/" className="social-link-v2">
              in
            </a>
          </div>
        </div>

        <div className="footer-links-v2">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/ai-chatbot">AI Chatbot</a>
            </li>
            <li>
              <a href="/project-platform">Project Platform</a>
            </li>
            <li>
              <a href="/resources">Resources</a>
            </li>
          </ul>
        </div>

        <div className="footer-links-v2">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright-v2">
        <p>VITAssist © 2025. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
