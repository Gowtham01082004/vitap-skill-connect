import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        <div className="step-card">
          <h3>Step 1: Create a Profile</h3>
          <p>Add your skills, experience, and interests.</p>
        </div>
        <div className="step-card">
          <h3>Step 2: Post or Browse Projects</h3>
          <p>List your idea or explore existing ones.</p>
        </div>
        <div className="step-card">
          <h3>Step 3: Connect & Apply</h3>
          <p>Engage with project owners and apply.</p>
        </div>
        <div className="step-card">
          <h3>Step 4: Start Collaborating</h3>
          <p>Use chat, file sharing, and built-in coding tools.</p>
        </div>
      </div>

      {/* Why Join Us Section */}
      <section className="why-join-us">
        <h2>Why Join Us?</h2>
        <div className="benefits-container">
          <div className="benefit-card">
            <h3>🚀 Turn Ideas into Reality</h3>
            <p>Bring your project ideas to life with the right team.</p>
          </div>
          <div className="benefit-card">
            <h3>🤝 Meet Talented People</h3>
            <p>
              Connect with like-minded developers, designers, and innovators.
            </p>
          </div>
          <div className="benefit-card">
            <h3>📈 Grow Your Skills</h3>
            <p>Work on real-world projects to enhance your expertise.</p>
          </div>
          <div className="benefit-card">
            <h3>🌟 Gain Recognition</h3>
            <p>Showcase your projects and build your professional portfolio.</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HowItWorks;
