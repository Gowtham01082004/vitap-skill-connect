// src/pages/roadmaps/DevOpsCloudRoadmap.jsx
import React from "react";
import "./MobileRoadmap.css";

const DevOpsCloudRoadmap = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="path-detail-header">
          <div className="path-icon-large">⚙️</div>
          <div className="path-info">
            <h1>DevOps & Cloud Roadmap</h1>
            <p>
              Master the practices and tools for continuous integration,
              delivery, and cloud infrastructure management across AWS, Azure,
              or GCP.
            </p>
          </div>
        </div>

        <div className="timeline">
          {/* Phase 1 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 1: Linux & Shell Scripting
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">2-3 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>Start with core Linux commands and shell scripting.</p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Linux file system</li>
                  <li>Common shell commands</li>
                  <li>Bash scripting basics</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Linux Handbook</span>
                  <span className="resource-badge">🎓 Bash for Beginners</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 2: Version Control & GitHub
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">1-2 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>Learn to manage source code using Git and GitHub.</p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Git basics (clone, commit, push)</li>
                  <li>Branching & merging</li>
                  <li>Pull requests & collaboration</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Pro Git Book</span>
                  <span className="resource-badge">💻 GitHub Docs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 3: Docker & Containers
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">2-3 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>Build and run containers using Docker.</p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Docker CLI & Dockerfile</li>
                  <li>Volumes & Networks</li>
                  <li>Docker Compose</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Docker Docs</span>
                  <span className="resource-badge">🎓 Play with Docker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 4: CI/CD Pipelines
              <span className="difficulty-badge">Advanced</span>
              <span className="est-time-badge">2-4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>Automate code building, testing, and deployment.</p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Jenkins, GitHub Actions</li>
                  <li>Pipeline-as-code (YAML)</li>
                  <li>Unit testing & artifacts</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    📚 CI/CD with GitHub Actions
                  </span>
                  <span className="resource-badge">
                    💻 Jenkins Pipeline Tutorial
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 5: Cloud Platforms
              <span className="difficulty-badge">Expert</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>Deploy and manage applications on AWS, Azure, or GCP.</p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>EC2, S3, IAM (AWS)</li>
                  <li>Azure VMs, Blob, RBAC</li>
                  <li>GCP Compute & Storage</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 AWS Free Tier Labs</span>
                  <span className="resource-badge">🎓 Azure Learn</span>
                  <span className="resource-badge">💻 GCP SkillBoost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsCloudRoadmap;
