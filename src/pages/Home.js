import React from "react";
import "./Home.css";
import Features from "../components/Features";

const Home = () => {
  return (
    <>
      <div className="home">
        <section className="hero">
          <h1>
            Empower Your Learning with <span>VITAssist</span>
          </h1>
          <p>
            AI-driven platform for students to access resources, collaborate on
            projects, and get instant university assistance.
          </p>
          <div className="hero-buttons">
            <button className="cta-primary">Get Started</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <Features />
    </>
  );
};

export default Home;
