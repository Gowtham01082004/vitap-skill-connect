import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./TeamMemberInfoPage.css";

const TeamMemberInfoPage = () => {
  const { email } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [createdProjects, setCreatedProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setUserData(snapshot.docs[0].data());
      }
    };

    const fetchProjects = async () => {
      const createdQuery = query(
        collection(db, "posts"),
        where("userEmail", "==", email)
      );
      const createdSnap = await getDocs(createdQuery);
      setCreatedProjects(
        createdSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const joinedQuery = query(
        collection(db, "requests"),
        where("sender", "==", email),
        where("status", "==", "accepted")
      );
      const joinedSnap = await getDocs(joinedQuery);
      const projects = [];

      for (const docSnap of joinedSnap.docs) {
        const { postId } = docSnap.data();
        const projRef = doc(db, "posts", postId);
        const projSnap = await getDoc(projRef);
        if (projSnap.exists()) {
          projects.push({
            id: projSnap.id,
            ...projSnap.data(),
          });
        }
      }

      setJoinedProjects(projects);
    };

    fetchMemberInfo();
    fetchProjects();
  }, [email]);

  const handleProjectClick = (project) => {
    const isJoined =
      project.userEmail === user.email ||
      (project.collaborators || []).includes(user.email);
    if (isJoined) {
      navigate(`/complete_accept_project/${project.id}`);
    } else {
      navigate(`/post/${project.id}`);
    }
  };

  if (!userData) return <div className="member-info-container">Loading...</div>;

  return (
    <div className="member-info-container">
      <h2>{userData.name || email.split("@")[0]}</h2>
      <div className="info-list">
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Department:</strong> {userData.department}
        </p>
        <p>
          <strong>Year:</strong> {userData.year}
        </p>
        <p>
          <strong>Primary Skills:</strong>{" "}
          {Array.isArray(userData.primarySkills)
            ? userData.primarySkills.join(", ")
            : userData.primarySkills || "N/A"}
        </p>
        <p>
          <strong>Preferred Categories:</strong>{" "}
          {Array.isArray(userData.projectCategories)
            ? userData.projectCategories.join(", ")
            : userData.projectCategories || "N/A"}
        </p>
      </div>

      <div className="project-section">
        <h3>Created Projects</h3>
        {createdProjects.length > 0 ? (
          createdProjects.map((proj) => (
            <div
              key={proj.id}
              className="project-card"
              onClick={() => handleProjectClick(proj)}
            >
              {proj.title}
            </div>
          ))
        ) : (
          <p className="empty-msg">No created projects.</p>
        )}
      </div>

      <div className="project-section">
        <h3>Joined Projects</h3>
        {joinedProjects.length > 0 ? (
          joinedProjects.map((proj) => (
            <div
              key={proj.id}
              className="project-card"
              onClick={() => handleProjectClick(proj)}
            >
              {proj.title}
            </div>
          ))
        ) : (
          <p className="empty-msg">No joined projects.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberInfoPage;
