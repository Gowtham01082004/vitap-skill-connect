import React from "react";
import "./AboutUs.css";
import founderImage from "../assets/images/OIP.jpg";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <h1>About Skill Connect</h1>
      <p>
        Skill Connect is an AI-powered platform designed to bring developers,
        designers, and innovators together to collaborate on projects, showcase
        skills, and find the right teammates.
      </p>

      {/* Mission & Vision */}
      <div className="mission-vision">
        <div className="mission">
          <h3>🌟 Our Mission</h3>
          <p>
            To empower students and professionals by connecting them with
            like-minded individuals and fostering a culture of innovation and
            learning.
          </p>
        </div>
        <div className="vision">
          <h3>🚀 Our Vision</h3>
          <p>
            To become the go-to global platform for collaborative project
            development and skill-building.
          </p>
        </div>
        <div className="values">
          <h3>💡 Our Values</h3>
          <p>
            We believe in open collaboration, knowledge sharing, and continuous
            learning to drive innovation and success.
          </p>
        </div>

        {/* Our Approach */}
        <div className="approach">
          <h3>🔗 Our Approach</h3>
          <p>
            By integrating AI-powered matchmaking and seamless project
            management tools, we make collaboration efficient and impactful.
          </p>
        </div>
        <div className="commitment">
          <h3>🤝 Our Commitment</h3>
          <p>
            We are dedicated to fostering an inclusive, diverse, and innovative
            community where everyone can thrive and contribute.
          </p>
        </div>

        {/* Our Growth */}
        <div className="growth">
          <h3>📈 Our Growth</h3>
          <p>
            Expanding globally, empowering thousands of students, professionals,
            and startups to bring their ideas to life through collaboration.
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <div className="founders">
        <h3>Meet Our Founders</h3>
        <div className="founder-container">
          <div className="founder-card">
            <img src={founderImage} alt="Founder 1" />
            <h4>Abhilash Kaleru</h4>
            <p>Co-Founder & CEO</p>
            <p>Software Engineer | AI Enthusiast | Community Builder</p>
          </div>
          <div className="founder-card">
            <img src={founderImage} alt="Founder 1" />
            <h4>Abhilash Kaleru</h4>
            <p>Co-Founder & CEO</p>
            <p>Software Engineer | AI Enthusiast | Community Builder</p>
          </div>
          <div className="founder-card">
            <img src={founderImage} alt="Founder 1" />
            <h4>Abhilash Kaleru</h4>
            <p>Co-Founder & CEO</p>
            <p>Software Engineer | AI Enthusiast | Community Builder</p>
          </div>
          <div className="founder-card">
            <img src={founderImage} alt="Founder 1" />
            <h4>Jane Doe</h4>
            <p>Co-Founder & CTO</p>
            <p>Blockchain Developer | Open Source Advocate | Tech Speaker</p>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="community-impact">
        <h3>🌎 Our Impact</h3>
        <div className="impact-stats">
          <div className="stat">
            <h4>50,000+</h4>
            <p>Active Users</p>
          </div>
          <div className="stat">
            <h4>10,000+</h4>
            <p>Projects Created</p>
          </div>
          <div className="stat">
            <h4>500+</h4>
            <p>Universities & Institutions</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-buttons">
        <button className="primary-btn">Join Our Community</button>
      </div>
    </div>
  );
};

export default AboutUs;
