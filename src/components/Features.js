import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <section className="vit-features" id="features">
      <div className="vit-features-container">
        <div className="vit-features-title">
          <h2>Our Services</h2>
          <p>
            Discover the tools and resources designed to enhance your VIT-AP
            experience
          </p>
        </div>

        <div className="vit-features-grid">
          {[
            {
              icon: "📄",
              title: "Skill Showcase",
              desc: "Create your profile and showcase your skills, projects, and achievements.",
            },
            {
              icon: "🤖",
              title: "AI Doubt Resolution",
              desc: "Get instant answers to your questions with our AI-powered chatbot.",
            },
            {
              icon: "👥",
              title: "Team Formation",
              desc: "Find perfect teammates for your projects based on skills and interests.",
            },
            {
              icon: "🚀",
              title: "Project Posting",
              desc: "Post your innovative project ideas, recruit members, and collaborate efficiently.",
            },
            {
              icon: "📚",
              title: "Previous Year Papers",
              desc: "Access and download previous years' question papers for your courses and exams.",
            },
            {
              icon: "🧮",
              title: "CGPA Calculator",
              desc: "Calculate your CGPA with ease for up to 12 semesters and track your performance.",
            },
            {
              icon: "🎓",
              title: "Interview Prep",
              desc: "Prepare for interviews with curated questions on OOPs, DBMS, DSA, and CN.",
            },
            {
              icon: "📥",
              title: "Requests Inbox",
              desc: "Manage all your project join requests and invites in one place.",
            },
          ].map((item, index) => (
            <div key={index} className="vit-feature-card">
              <div className="vit-feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
