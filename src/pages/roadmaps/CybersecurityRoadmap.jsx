import React from "react";
import "./MobileRoadmap.css";

const CybersecurityRoadmap = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="path-detail-header">
          <div className="path-icon-large">🔐</div>
          <div className="path-info">
            <h1>Cybersecurity Roadmap</h1>
            <p>
              Build expertise in securing networks, systems, and data from
              digital threats using foundational principles and practical tools.
            </p>
          </div>
        </div>

        <div className="timeline">
          {/* Phase 1 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 1: Basics of Cybersecurity
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">3-4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>Understand what cybersecurity is and its core principles.</p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>CIA Triad (Confidentiality, Integrity, Availability)</li>
                  <li>Common types of cyber threats</li>
                  <li>Basic security hygiene & safe practices</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    📚 Cybrary Intro Course
                  </span>
                  <span className="resource-badge">
                    🎓 Google Cybersecurity Foundations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 2: Networking & OS Fundamentals
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">3-5 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn how networks and operating systems function and their
                vulnerabilities.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>TCP/IP, DNS, HTTP/S</li>
                  <li>Ports, Protocols, Firewalls</li>
                  <li>Linux & Windows security concepts</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">
                    📚 Networking Basics (Cisco)
                  </span>
                  <span className="resource-badge">
                    🎓 TryHackMe Linux Fundamentals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 3: System & Web Security
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Explore how to secure systems and web applications from common
                attacks.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>OWASP Top 10 Web Vulnerabilities</li>
                  <li>SQL Injection, XSS, CSRF</li>
                  <li>File Permissions & Patch Management</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 OWASP Cheat Sheets</span>
                  <span className="resource-badge">💻 PortSwigger Labs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 4: Ethical Hacking & Penetration Testing
              <span className="difficulty-badge">Advanced</span>
              <span className="est-time-badge">6-8 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Learn to ethically hack systems and perform security
                assessments.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Kali Linux & Metasploit</li>
                  <li>Enumeration, Exploitation</li>
                  <li>Reconnaissance & Reporting</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Hacker101</span>
                  <span className="resource-badge">
                    🎓 TryHackMe Offensive Pentesting
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 5: Security Operations & Career Prep
              <span className="difficulty-badge">Expert</span>
              <span className="est-time-badge">4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Focus on blue team roles, real-world scenarios, certifications,
                and job readiness.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>SIEM, IDS/IPS, and Logging</li>
                  <li>Incident Response & SOC roles</li>
                  <li>Security certifications (CEH, CompTIA Security+)</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Blue Team Handbook</span>
                  <span className="resource-badge">
                    🎓 CompTIA Security+ Guide
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

export default CybersecurityRoadmap;
