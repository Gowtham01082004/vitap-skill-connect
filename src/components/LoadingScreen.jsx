// components/LoadingScreen.jsx
import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
