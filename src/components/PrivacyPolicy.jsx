import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: March 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Skill Connect. This Privacy Policy outlines how we collect,
          use, and protect your personal information when you use our platform.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Your name, email, and university information upon sign-up</li>
          <li>Profile preferences like skills, categories, and interests</li>
          <li>Usage activity within the platform</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>
            To personalize your experience and match you with relevant projects
          </li>
          <li>To facilitate collaboration and communication</li>
          <li>To improve our platform’s features and services</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We use secure servers and encryption to protect your personal data.
          Only authorized personnel have access to this information.
        </p>
      </section>

      <section>
        <h2>5. Third-party Services</h2>
        <p>
          We do not sell or share your personal information with third parties,
          except for services that help us operate Skill Connect (e.g.,
          Firebase).
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your information
          anytime. Please contact us at support@skillconnect.com for any privacy
          concerns.
        </p>
      </section>

      <section>
        <h2>7. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted here and notified via email if significant.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
