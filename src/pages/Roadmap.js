// src/pages/Roadmap.js
import React from "react";
import { Link } from "react-router-dom";
import "./Roadmap.css";

const Roadmap = () => {
  return (
    <div className="main-content">
      <div className="welcome-section">
        <h1>📚 Learning Roadmaps</h1>
        <p>
          Start your journey with structured paths to gain in-demand skills and
          build real-world projects.
        </p>
      </div>

      <div className="roadmap-container">
        <div className="roadmap-header">
          <h2>🚀 Choose Your Learning Path</h2>
          <p>Tap into curated roadmaps across top technology domains</p>
        </div>

        <div className="roadmap-categories">
          {[
            {
              icon: "💻",
              title: "Web Development",
              description:
                "Master frontend and backend technologies to build modern web applications",
              milestones: [
                "HTML, CSS Fundamentals",
                "JavaScript & DOM",
                "Frontend Frameworks",
                "Backend Development",
              ],
              anchor: "/roadmap/web",
            },
            {
              icon: "📱",
              title: "Mobile Development",
              description:
                "Learn to build native and cross-platform mobile applications",
              milestones: [
                "Mobile UI Design",
                "React Native",
                "Flutter",
                "Native Android/iOS",
              ],
              anchor: "/roadmap/mobile",
            },
            {
              icon: "📊",
              title: "Data Science",
              description:
                "Analyze data, build predictive models, and gain ML expertise",
              milestones: ["Python", "Statistics", "ML", "Visualization"],
              anchor: "/roadmap/data-science",
            },
            {
              icon: "🔐",
              title: "Cybersecurity",
              description:
                "Become a guardian of data, systems, and digital infrastructure",
              milestones: [
                "Networking",
                "Security Principles",
                "Ethical Hacking",
                "SOC",
              ],
              anchor: "/roadmap/cybersecurity",
            },
            {
              icon: "⚙️",
              title: "DevOps & Cloud",
              description:
                "Automate, deploy, and scale systems with cloud tools",
              milestones: ["Linux", "Docker", "CI/CD", "AWS/Azure/GCP"],
              anchor: "/roadmap/devops",
            },
            {
              icon: "⛓️",
              title: "Blockchain",
              description: "Build decentralized apps & smart contracts",
              milestones: [
                "Blockchain Basics",
                "Smart Contracts",
                "DApps",
                "Web3",
              ],
              anchor: "/roadmap/blockchain",
            },
          ].map((item, i) => (
            <div key={i} className="roadmap-card">
              <div className="roadmap-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="milestone-list">
                {item.milestones.map((m, idx) => (
                  <div className="milestone" key={idx}>
                    {m}
                  </div>
                ))}
              </div>
              <Link to={item.anchor} className="explore-btn">
                Explore Path →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
