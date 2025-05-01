import React from "react";
import "./MobileRoadmap.css";

const DataScienceRoadmap = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="path-detail-header">
          <div className="path-icon-large">📊</div>
          <div className="path-info">
            <h1>Data Science Roadmap</h1>
            <p>
              Learn to extract insights from data, build predictive models, and
              make data-driven decisions using Python, ML, and more.
            </p>
          </div>
        </div>

        <div className="timeline">
          {/* Phase 1 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 1: Data Analysis with Python
              <span className="difficulty-badge">Beginner</span>
              <span className="est-time-badge">4-6 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Start your journey with Python programming and data analysis
                libraries like Pandas and NumPy.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Python Basics</li>
                  <li>Jupyter Notebooks</li>
                  <li>Pandas, NumPy</li>
                  <li>Data Cleaning & Manipulation</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Python.org</span>
                  <span className="resource-badge">🎓 Kaggle Courses</span>
                  <span className="resource-badge">📺 Corey Schafer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 2: Statistics & Probability
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Understand statistical methods used to derive insights from data
                and make predictions.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Descriptive Statistics</li>
                  <li>Probability Theory</li>
                  <li>Hypothesis Testing</li>
                  <li>Distributions</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Khan Academy</span>
                  <span className="resource-badge">🎓 StatQuest</span>
                  <span className="resource-badge">📺 CrashCourse Stats</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 3: Machine Learning
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">6-8 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Train predictive models using supervised and unsupervised
                learning techniques.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Scikit-learn</li>
                  <li>Linear/Logistic Regression</li>
                  <li>Decision Trees, SVMs</li>
                  <li>KMeans, Clustering</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Scikit-learn Docs</span>
                  <span className="resource-badge">🎓 Coursera ML</span>
                  <span className="resource-badge">📺 Sentdex ML</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 4: Data Visualization
              <span className="difficulty-badge">Intermediate</span>
              <span className="est-time-badge">3 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Use visual storytelling to explain your data insights
                effectively.
              </p>
              <div className="timeline-detail">
                <h4>Key Topics:</h4>
                <ul>
                  <li>Matplotlib & Seaborn</li>
                  <li>Interactive Dashboards (Plotly, Streamlit)</li>
                  <li>Dash and Tableau (optional)</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Seaborn Docs</span>
                  <span className="resource-badge">🎓 DataCamp Viz</span>
                  <span className="resource-badge">
                    📺 Streamlit Crash Course
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <h3>
              Phase 5: Real Projects & Portfolio
              <span className="difficulty-badge">Advanced</span>
              <span className="est-time-badge">3-4 weeks</span>
            </h3>
            <div className="timeline-content">
              <p>
                Apply what you've learned in real-world projects and build a
                portfolio to showcase your skills.
              </p>
              <div className="timeline-detail">
                <h4>Key Projects:</h4>
                <ul>
                  <li>EDA on Real Datasets</li>
                  <li>ML Project on Kaggle</li>
                  <li>Dashboard using Streamlit</li>
                </ul>
                <div className="resources-list">
                  <span className="resource-badge">📚 Kaggle Datasets</span>
                  <span className="resource-badge">🎓 Portfolio Guide</span>
                  <span className="resource-badge">
                    📺 Real Python Projects
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

export default DataScienceRoadmap;
