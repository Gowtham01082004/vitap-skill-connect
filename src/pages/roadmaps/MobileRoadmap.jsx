// src/pages/roadmaps/MobileRoadmap.jsx
import React from "react";
import "../roadmaps/MobileRoadmap.css";

const MobileRoadmap = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="path-detail-header">
          <div className="path-icon-large">📱</div>
          <div className="path-info">
            <h1>Mobile Development Roadmap</h1>
            <p>
              Learn to build native and cross-platform mobile applications with
              industry-standard frameworks and tools.
            </p>
          </div>
        </div>

        <div className="timeline">
          {/* Phase 1 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 1: Mobile Development Fundamentals
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Understand core mobile concepts, platform differences, and
                design foundations.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>iOS vs Android overview</li>
                  <li>Mobile UX design principles</li>
                  <li>Responsive layouts and gestures</li>
                  <li>Common navigation patterns</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>UI/UX Guide
                  </span>
                  <span className="resource-badge">
                    <i>📺</i>Figma Tutorials
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 2: React Native Development
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">6-8 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn to build cross-platform apps using React Native and
                JavaScript.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>JSX & Core Components</li>
                  <li>Hooks and State Management</li>
                  <li>React Navigation</li>
                  <li>Async Storage and APIs</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>React Native Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>Expo Tutorials
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 3: Flutter Development
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">6-8 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Build native-like mobile apps using Google's Flutter and the
                Dart language.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Dart syntax basics</li>
                  <li>Stateless & Stateful widgets</li>
                  <li>Flutter UI and themes</li>
                  <li>Routing and navigation</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>Flutter Docs
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>DartPad
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 4: Backend Integration & Data Storage
              <span className="difficulty-badge">Advanced</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn how to connect your app to backend services and persist
                data securely.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>REST & GraphQL APIs</li>
                  <li>Firebase Authentication</li>
                  <li>Local storage (SQLite/Realm)</li>
                  <li>Push notifications</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📚</i>Firebase Docs
                  </span>
                  <span className="resource-badge">
                    <i>💻</i>GraphQL Basics
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 5: Testing & Deployment
              <span className="difficulty-badge">Expert</span>
              <span className="est-time-badge">2-4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Polish your app with tests, optimize it for performance, and
                publish it to stores.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Unit & integration testing</li>
                  <li>CI/CD pipelines for mobile</li>
                  <li>Performance & battery profiling</li>
                  <li>App Store / Play Store deployment</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    <i>📺</i>CI/CD with GitHub Actions
                  </span>
                  <span className="resource-badge">
                    <i>📚</i>Play Console Guide
                  </span>
                  <span className="resource-badge">
                    <i>🎓</i>Testing Crash Course
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

export default MobileRoadmap;
