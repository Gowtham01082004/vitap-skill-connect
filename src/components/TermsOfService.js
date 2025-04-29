import React from "react";
import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="policy-container">
      <h1>Terms of Service</h1>
      <p>Effective Date: March 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By creating an account or using Skill Connect, you agree to these Terms
        of Service.
      </p>

      <h2>2. Account Responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials. Do not impersonate others or use fake details.
      </p>

      <h2>3. Use of Platform</h2>
      <ul>
        <li>
          You may use Skill Connect for academic, collaborative, and
          non-commercial purposes.
        </li>
        <li>Do not post harmful, inappropriate, or misleading content.</li>
        <li>Respect other users and maintain a safe, respectful community.</li>
      </ul>

      <h2>4. Termination</h2>
      <p>
        We reserve the right to suspend or terminate accounts that violate our
        terms or engage in harmful behavior.
      </p>

      <h2>5. Modifications</h2>
      <p>
        We may update these terms as needed. Continued use of Skill Connect
        implies acceptance of the updated terms.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        For any legal or account-related concerns, please reach out to us at{" "}
        <strong>legal@skillconnect.app</strong>
      </p>
    </div>
  );
};

export default TermsOfService;
