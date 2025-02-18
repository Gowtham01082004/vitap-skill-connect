import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  // Getting Started
  {
    question: "What is Skill Connect?",
    answer:
      "Skill Connect is a platform that connects students and professionals to collaborate on projects, share skills, and grow together.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button in the navigation bar and follow the instructions to create an account.",
  },
  {
    question: "Is Skill Connect free to use?",
    answer:
      "Yes! Skill Connect is free to use for students and professionals looking to collaborate.",
  },
  {
    question: "Can I use Skill Connect without signing in?",
    answer:
      "You can browse public projects, but you must sign in to post projects, apply for collaborations, and interact with other users.",
  },

  // Project & Collaboration
  {
    question: "How do I post a project?",
    answer:
      "Once logged in, click on 'Create Project', fill in the required details, and submit. Your project will be visible to other users.",
  },
  {
    question: "How do I find collaborators for my project?",
    answer:
      "Once you post a project, users with relevant skills can find and apply to collaborate with you. You can review applications and select the best fit.",
  },
  {
    question: "How do I apply to join a project?",
    answer:
      "Browse available projects, click on one that interests you, and click 'Apply'. The project owner will review your application.",
  },
  {
    question: "Can I manage multiple projects at the same time?",
    answer:
      "Yes! You can create and manage multiple projects from your dashboard.",
  },

  // User Profile & Skills
  {
    question: "How do I update my profile?",
    answer:
      "Go to your profile settings, update your information, and click 'Save'.",
  },
  {
    question: "Can I add multiple skills to my profile?",
    answer:
      "Yes! You can list multiple skills, and they will help match you with relevant projects.",
  },
  {
    question: "How does Skill Connect match users to projects?",
    answer:
      "Our AI-powered system recommends projects based on your skills, interests, and past collaborations.",
  },

  // Communication & Interaction
  {
    question: "How do I communicate with my project team?",
    answer:
      "Skill Connect offers an integrated chat system for teams to collaborate in real time.",
  },
  {
    question: "Is there a way to track project progress?",
    answer:
      "Yes! Each project has a dashboard where you can track progress, milestones, and team activity.",
  },
  {
    question: "Can I rate my collaborators?",
    answer:
      "Yes! After completing a project, you can rate your teammates and provide feedback.",
  },

  // Privacy & Security
  {
    question: "How secure is my data on Skill Connect?",
    answer:
      "We use industry-standard encryption and security measures to protect your data.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes! You can go to account settings and request account deletion. Your data will be permanently removed.",
  },

  // Support
  {
    question: "What should I do if I encounter a problem?",
    answer:
      "You can visit our Support Center or contact our customer support team via email.",
  },
  {
    question: "Is there a mobile app for Skill Connect?",
    answer:
      "Not yet, but we are working on a mobile-friendly version and an app in the future!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions (FAQs)</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
