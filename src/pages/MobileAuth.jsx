import React, { useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./MobileAuth.css";

const MobileAuth = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (tab) => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (activeTab === "signup" && !name)) {
      setError("All fields are required.");
      return;
    }

    try {
      if (activeTab === "signup") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          name,
          email,
          createdAt: new Date(),
          emailVerified: false,
          profileCompleted: false,
          isOnline: true,
        });
        alert("Check your inbox for verification link.");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in.");
          return;
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "signin" ? "active" : ""}`}
          onClick={() => handleToggle("signin")}
        >
          Sign In
        </button>
        <button
          className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => handleToggle("signup")}
        >
          Sign Up
        </button>
      </div>

      <div className="welcome-text">
        <h1>{activeTab === "signin" ? "Hello, Friend!" : "Create Account"}</h1>
        <p>
          {activeTab === "signin"
            ? "Welcome back! Sign in to continue"
            : "Start your journey with us"}
        </p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        {activeTab === "signup" && (
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="input-group">
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {activeTab === "signin" && (
          <div className="forgot-pw">
            <a href="#!" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </div>
        )}

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button type="submit" className="btn-primary">
          {activeTab === "signin" ? "SIGN IN" : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default MobileAuth;
