import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <h2>Core Features</h2>
      <div className="features-container">
        <div className="feature-card">
          <h3>📄 Skill Showcase</h3>
          <p>
            Create your profile and showcase your skills, projects, and
            achievements.
          </p>
        </div>
        <div className="feature-card">
          <h3>🤖 AI Doubt Resolution</h3>
          <p>
            Get instant answers to your questions with our AI-powered chatbot.
          </p>
        </div>
        <div className="feature-card">
          <h3>👥 Team Formation</h3>
          <p>
            Find perfect teammates for your projects based on skills and
            interests.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
