import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MyProjects.css";

const MyProjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [createdProjects, setCreatedProjects] = useState([]);
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      setLoading(true);

      // Created Projects
      const createdQuery = query(
        collection(db, "posts"),
        where("userId", "==", user.uid)
      );
      const createdSnapshot = await getDocs(createdQuery);
      const created = createdSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Accepted Projects
      const acceptedQuery = query(
        collection(db, "requests"),
        where("sender", "==", user.email),
        where("status", "==", "accepted")
      );
      const acceptedSnapshot = await getDocs(acceptedQuery);
      const accepted = [];

      for (const docSnap of acceptedSnapshot.docs) {
        const { postId } = docSnap.data();
        const projectDoc = await getDoc(doc(db, "posts", postId));
        if (projectDoc.exists()) {
          accepted.push({ id: projectDoc.id, ...projectDoc.data() });
        }
      }

      setCreatedProjects(created);
      setAcceptedProjects(accepted);
      setLoading(false);
    };

    fetchProjects();
  }, [user]);

  const handleSelectProject = async (project) => {
    const acceptedQuery = query(
      collection(db, "requests"),
      where("postId", "==", project.id),
      where("status", "==", "accepted")
    );
    const snapshot = await getDocs(acceptedQuery);

    const roleCounts = {};
    snapshot.forEach((docSnap) => {
      const { selectedRoleIndex } = docSnap.data();
      if (selectedRoleIndex !== undefined) {
        roleCounts[selectedRoleIndex] =
          (roleCounts[selectedRoleIndex] || 0) + 1;
      }
    });

    const updatedRoles = (project.roles || []).map((role, i) => ({
      ...role,
      filledCount: roleCounts[i] || 0,
    }));

    setSelectedProject({ ...project, roles: updatedRoles });
  };

  const handleEnterProject = () => {
    if (selectedProject) {
      navigate(`/complete_accept_project/${selectedProject.id}`);
    }
  };

  return (
    <div className="my-projects-container">
      <div className="project-list">
        <div className="project-box">
          <h3>Created Projects</h3>
          {loading ? (
            <div className="loader">Loading projects...</div>
          ) : createdProjects.length > 0 ? (
            createdProjects.map((proj) => (
              <div
                key={proj.id}
                className={`project-item ${
                  selectedProject?.id === proj.id ? "active" : ""
                }`}
                onClick={() => handleSelectProject(proj)}
              >
                {proj.title}
              </div>
            ))
          ) : (
            <p className="no-projects">No created projects found.</p>
          )}
        </div>

        <div className="project-box">
          <h3>Accepted Projects</h3>
          {loading ? (
            <div className="loader">Loading projects...</div>
          ) : acceptedProjects.length > 0 ? (
            acceptedProjects.map((proj) => (
              <div
                key={proj.id}
                className={`project-item ${
                  selectedProject?.id === proj.id ? "active" : ""
                }`}
                onClick={() => handleSelectProject(proj)}
              >
                {proj.title}
              </div>
            ))
          ) : (
            <p className="no-projects">No accepted projects found.</p>
          )}
        </div>
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

            <strong>Roles:</strong>
            <ul>
              {(selectedProject.roles || []).map((role, index) => (
                <li key={index}>
                  <strong>{role.title}</strong> - {role.filledCount}/
                  {role.count}
                </li>
              ))}
            </ul>

            <div className="chat-access-note">
              <strong>Group Chat:</strong> (Coming soon 🚧)
            </div>

            <button className="enter-project-btn" onClick={handleEnterProject}>
              Enter Project
            </button>
          </>
        ) : (
          <p>Select a project to view details</p>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
