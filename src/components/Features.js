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

          {/* Project Posting & Collaboration */}
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Project Posting</h3>
            <p>
              Post your innovative project ideas, recruit members, and
              collaborate efficiently.
            </p>
          </div>

          {/* Previous Year Question Papers */}
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Previous Year Papers</h3>
            <p>
              Access and download previous years' question papers for your
              courses and exams.
            </p>
          </div>

          {/* CGPA Calculator */}
          <div className="feature-card">
            <div className="feature-icon">🧮</div>
            <h3>CGPA Calculator</h3>
            <p>
              Calculate your CGPA with ease for up to 12 semesters and track
              your academic performance.
            </p>
          </div>

          {/* Interview Preparation */}
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Interview Prep</h3>
            <p>
              Prepare for technical interviews with curated questions on OOPs,
              DBMS, DSA, and CN.
            </p>
          </div>

          {/* Request Inbox */}
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Requests Inbox</h3>
            <p>
              Manage all your project join requests and collaboration
              invitations in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
