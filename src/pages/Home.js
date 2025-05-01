import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Features from "../components/Features";

const Home = () => {
  const navigate = useNavigate();
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
            <button className="cta-primary" onClick={() => navigate("/auth")}>
              Get Started
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/how-it-works")}
            >
              Learn More
            </button>
          </div>
        </section>
      </div>
      <Features />
    </>
  );
};

export default Home;
