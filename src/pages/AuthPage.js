import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationPopup, setVerificationPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkVerification = setInterval(async () => {
          await user.reload(); // ✅ Refresh user data from Firebase
          if (user.emailVerified) {
            clearInterval(checkVerification);
            navigate("/profile-setup", {
              state: { uid: user.uid, email: user.email },
            });
          }
        }, 3000); // ✅ Poll every 3 seconds for verification update

        return () => clearInterval(checkVerification);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const getErrorMessage = (code) => {
    const messages = {
      "auth/email-already-in-use": "This email is already registered.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/user-not-found": "No account found with this email.",
    };
    return messages[code] || "An error occurred. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || (isSignUp && !name)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Send email verification and open the verification popup
        await sendEmailVerification(user);
        setEmailSent(true);
        setVerificationPopup(true);

        // Save user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          createdAt: new Date(),
          emailVerified: false,
        });
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
        navigate("/logged-homepage");
      }
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  return (
    <div className="auth-container">
      <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
        {emailSent ? (
          <div className="email-verification-container">
            <h2>Check Your Email</h2>
            <p>
              A verification email has been sent to <strong>{email}</strong>.
            </p>
            <p>Please verify your email before logging in.</p>
          </div>
        ) : isSignUp ? (
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </form>
          </div>
        ) : (
          <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
              <h1>Sign in</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>
              <p className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
              </p>
              {error && <p className="error">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Sign In"}
              </button>
            </form>
          </div>
        )}

        {/* ✅ Overlay to toggle between Sign In and Sign Up */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>If you already have an account, sign in here</p>
              <button className="ghost" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start your journey with us</p>
              <button className="ghost" onClick={handleToggle}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Verification Popup (appears above everything) */}
      {verificationPopup && (
        <>
          <div className="verification-overlay"></div>{" "}
          {/* Background overlay */}
          <div className="verification-popup">
            <h3>Email Verification Required</h3>
            <p>
              We've sent a verification email to <strong>{email}</strong>.
              Please check your inbox and verify your email.
            </p>
            <p>Once verified, you will be redirected automatically.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthPage;
