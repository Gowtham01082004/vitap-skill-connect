import React from "react";
import "./MobileRoadmap.css";

const WebDevelopmentRoadmap = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="path-detail-header">
          <div className="path-icon-large">💻</div>
          <div className="path-info">
            <h1>Web Development Roadmap</h1>
            <p>
              A complete guide to becoming a full-stack web developer, from the
              fundamentals of HTML/CSS to modern frontend frameworks, backend,
              and deployment.
            </p>
          </div>
        </div>

        <div className="timeline">
          {/* Phase 1 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 1: Web Fundamentals
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn the core building blocks of the web: HTML for structure,
                CSS for styling, and JavaScript basics.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>HTML5 Semantic Elements</li>
                  <li>CSS Box Model & Flex/Grid Layout</li>
                  <li>Responsive Design</li>
                  <li>Basic JavaScript: variables, loops, functions</li>
                  <li>DOM manipulation</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>MDN Web Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>freeCodeCamp
                  </span>
                  <span className="resource-badge">
                    <i>📺</i>CSS-Tricks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 2: Frontend Development
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">6-8 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Dive deeper into JavaScript and learn a modern frontend
                framework like React.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>ES6+, Promises, Async/Await</li>
                  <li>React.js: Components, State, Props</li>
                  <li>Hooks and Context API</li>
                  <li>Form Handling and Routing</li>
                  <li>CSS-in-JS or Tailwind</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>React Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>JavaScript.info
                  </span>
                  <span className="resource-badge">
                    <i>📺</i>Frontend Masters
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 3: Backend Development
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn to build server-side applications, REST APIs, and connect
                databases.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Node.js and Express</li>
                  <li>Routing and Middleware</li>
                  <li>MongoDB or PostgreSQL</li>
                  <li>CRUD Operations</li>
                  <li>Authentication and Authorization</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>Node Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>MongoDB University
                  </span>
                  <span className="resource-badge">
                    <i>📺</i>Express Handbook
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 4: Full-Stack Integration
              <span className="difficulty-badge">Advanced</span>
              <span className="est-time-badge">4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Combine your frontend and backend knowledge to build full-stack
                apps.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>API Integration with React</li>
                  <li>JWT Authentication</li>
                  <li>File Uploads & Forms</li>
                  <li>State Syncing</li>
                  <li>Security & Error Handling</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>JWT Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>Fullstack Open
                  </span>
                  <span className="resource-badge">
                    <i>📺</i>Traversy Media
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 5: Deployment & Advanced Tools
              <span className="difficulty-badge">Expert</span>
              <span className="est-time-badge">2-3 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn how to deploy, monitor, and scale your web apps in
                production.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Deploy on Vercel, Netlify, Render</li>
                  <li>CI/CD with GitHub Actions</li>
                  <li>Performance Monitoring</li>
                  <li>SEO Basics and Lighthouse</li>
                  <li>Testing (Jest, React Testing Library)</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>Vercel Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>Netlify Guides
                  </span>
                  <span className="resource-badge">
                    <i>📺</i>Testing Library
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopmentRoadmap;
