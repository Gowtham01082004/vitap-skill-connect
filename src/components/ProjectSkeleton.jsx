// src/components/ProjectSkeleton.jsx
import React from "react";
import "./ProjectSkeleton.css";

const ProjectSkeleton = () => {
  return (
    <div className="project-card skeleton-card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-dept" />
      <div className="skeleton skeleton-desc" />
      <div className="skeleton skeleton-meta" />
      <div className="skeleton skeleton-skills" />
      <div className="skeleton skeleton-footer" />
    </div>
  );
};

export default ProjectSkeleton;
