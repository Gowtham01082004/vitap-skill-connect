import React from "react";
import "./Features.css"; // Reuse your existing CSS or extend with new classes

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Discover the tools and resources designed to enhance your VIT-AP
            experience
          </p>
        </div>

        <div className="features-grid">
          {/* Skill Showcase */}
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Skill Showcase</h3>
            <p>
              Create your profile and showcase your skills, projects, and
              achievements.
            </p>
          </div>

          {/* AI Chatbot */}
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Doubt Resolution</h3>
            <p>
              Get instant answers to your questions with our AI-powered chatbot.
            </p>
          </div>

          {/* Team Formation */}
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Formation</h3>
            <p>
              Find perfect teammates for your projects based on skills and
              interests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
