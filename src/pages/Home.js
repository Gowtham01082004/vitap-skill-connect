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
          Connect, Collaborate, and Learn Together with <span>US</span>
          </h1>
          <p>
          Join VIT-AP SkillConnect to find peers, share knowledge, and grow together in your learning journey.
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
