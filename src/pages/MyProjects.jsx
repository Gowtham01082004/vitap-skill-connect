// src/pages/MyProjects.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./MyProjects.css";

const MyProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      const q = query(collection(db, "posts"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const fetchedProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, [user]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="my-projects-container">
      <div className="project-list">
        <h3>My Projects</h3>
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`project-item ${
              selectedProject?.id === proj.id ? "active" : ""
            }`}
            onClick={() => handleSelectProject(proj)}
          >
            {proj.title}
          </div>
        ))}
      </div>

      <div className="project-details">
        {selectedProject ? (
          <>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.fullDescription}</p>
            <p>
              <strong>Duration:</strong> {selectedProject.duration}
            </p>
            <p>
              <strong>Domain:</strong> {selectedProject.domain?.join(", ")}
            </p>
            <p>
              <strong>Roles:</strong>
            </p>
            <ul>
              {(selectedProject.roles || []).map((role, index) => (
                <li key={index}>
                  <strong>{role.title}</strong> - {role.currentCount}/
                  {role.requiredCount}
                  <ul>
                    {(role.assignedMembers || []).map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="chat-access-note">
              <strong>Group Chat:</strong> (Coming soon 🚧)
            </div>
          </>
        ) : (
          <p>Select a project to view details</p>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
