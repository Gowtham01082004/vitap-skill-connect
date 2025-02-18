import React from "react";
import "./Home.css";
import Features from "../components/Features";

const Home = () => {
  return (
    <>
      <div className="home">
        <section className="hero">
          <h1>Connect, Learn & Grow Together</h1>
          <p>
            AI-powered platform for students to showcase skills, find peers, and
            collaborate on projects.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </section>
      </div>

      {/* Features Component */}
      <Features />
    </>
  );
};

export default Home;
