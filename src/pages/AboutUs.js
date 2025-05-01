import React from "react";
import "./AboutUs.css";
import founder1 from "../assets/images/Abhilash.jpg";
import founder2 from "../assets/images/palla.jpg";
import founder3 from "../assets/images/sam.jpg";
// Add the actual image path for Samhitha

const AboutUs = () => {
  const founders = [
    {
      name: "Palla Suhaas",
      image: founder2,
      role: "Co-Founder & CEO",
    },
    {
      name: "Samhitha Revanur",
      image: founder3,
      role: "Co-Founder & CEO",
    },
    {
      name: "Kaleru Abhilash",
      image: founder1,
      role: "Co-Founder & CEO",
    },
  ];

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
        {[
          {
            title: "🌟 Our Mission",
            desc: "To empower students and professionals by connecting them with like-minded individuals and fostering a culture of innovation and learning.",
          },
          {
            title: "🚀 Our Vision",
            desc: "To become the go-to global platform for collaborative project development and skill-building.",
          },
          {
            title: "💡 Our Values",
            desc: "We believe in open collaboration, knowledge sharing, and continuous learning to drive innovation and success.",
          },
          {
            title: "🔗 Our Approach",
            desc: "By integrating AI-powered matchmaking and seamless project management tools, we make collaboration efficient and impactful.",
          },
          {
            title: "🤝 Our Commitment",
            desc: "We are dedicated to fostering an inclusive, diverse, and innovative community where everyone can thrive and contribute.",
          },
          {
            title: "📈 Our Growth",
            desc: "Expanding globally, empowering thousands of students, professionals, and startups to bring their ideas to life through collaboration.",
          },
        ].map((item, index) => (
          <div key={index} className="mission-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Founders Section */}
      <div className="founders">
        <h3>Meet Our Founders</h3>
        <div className="founder-container">
          {founders.map((founder, index) => (
            <div key={index} className="founder-card">
              <img src={founder.image} alt={founder.name} />
              <h4>{founder.name}</h4>
              <p>{founder.role}</p>
              <p>Software Engineer | AI Enthusiast | Community Builder</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Highlights */}
      <div className="platform-highlights">
        <h3>🌟 Platform Highlights</h3>
        <div className="highlight-cards">
          {[
            {
              title: "🚀 2000+ Successful Collaborations",
              desc: "Students and professionals have teamed up to create amazing projects across various domains.",
            },
            {
              title: "🎯 Skill-First Matching",
              desc: "Our AI system matches you with projects and collaborators based on your unique skills and interests.",
            },
            {
              title: "🏆 Project Showcases",
              desc: "Top projects are featured and celebrated, giving visibility to creators and innovators.",
            },
          ].map((item, index) => (
            <div key={index} className="highlight-card">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="about-buttons">
        <button className="primary-btn">Join Our Community</button>
      </div>
    </div>
  );
};

export default AboutUs;
