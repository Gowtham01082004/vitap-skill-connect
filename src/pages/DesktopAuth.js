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
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./AuthPage.css";

const DesktopAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (!data.profileCompleted) {
            navigate("/profile-setup", {
              state: { uid: user.uid, email: user.email },
            });
          } else {
            navigate("/dashboard");
          }
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const getErrorMessage = (code) => {
    const messages = {
      "auth/email-already-in-use": "This email is already registered.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/user-not-found": "No account found with this email.",
      "auth/network-request-failed":
        "Network error. Check your internet connection.",
    };
    return messages[code] || "An error occurred. Please try again.";
  };

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
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
        await sendEmailVerification(user);
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          email,
          createdAt: new Date(),
          emailVerified: false,
          profileCompleted: false,
          isOnline: true,
        });
        setEmailSent(true);
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
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        const data = userDoc.data();
        if (!data.profileCompleted) {
          navigate("/profile-setup", {
            state: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            },
          });
        } else {
          navigate("/dashboard");
        }
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
      <div className={`auth-wrapper ${isSignUp ? "right-panel-active" : ""}`}>
        {emailSent ? (
          <div className="auth-email-verification-container">
            <h2>Check Your Email</h2>
            <p>
              A verification email has been sent to <strong>{email}</strong>.
            </p>
            <p>Please verify before logging in.</p>
          </div>
        ) : (
          <>
            <div className="auth-form-container auth-sign-in-container">
              <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
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
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>

            <div className="auth-form-container auth-sign-up-container">
              <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input
                  type="text"
                  placeholder="Full Name"
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
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </form>
            </div>
          </>
        )}

        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-left">
              <h1>Welcome Back!</h1>
              <p>If you already have an account, sign in here</p>
              <button className="ghost" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start your journey with us</p>
              <button className="ghost" onClick={handleToggle}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopAuth;
