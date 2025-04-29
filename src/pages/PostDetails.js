import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [ownerName, setOwnerName] = useState("Loading...");
  const [filledRoles, setFilledRoles] = useState({});
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [appliedRoleIndex, setAppliedRoleIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const postDoc = await getDoc(doc(db, "posts", id));
      if (postDoc.exists()) {
        const data = postDoc.data();
        setPost({ id: postDoc.id, ...data });

        const userDoc = await getDoc(doc(db, "users", data.userId));
        if (userDoc.exists()) setOwnerName(userDoc.data().username);

        const reqSnap = await getDocs(
          query(
            collection(db, "requests"),
            where("postId", "==", postDoc.id),
            where("status", "==", "accepted")
          )
        );

        const counts = {};
        reqSnap.forEach((doc) => {
          const r = doc.data();
          if (r.selectedRoleIndex !== undefined) {
            counts[r.selectedRoleIndex] =
              (counts[r.selectedRoleIndex] || 0) + 1;
          }
        });

        setFilledRoles(counts);
      }
    };

    const checkRequest = async () => {
      if (!user) return;
      const snap = await getDocs(
        query(
          collection(db, "requests"),
          where("postId", "==", id),
          where("sender", "==", user.email)
        )
      );
      if (!snap.empty) {
        setRequestSent(true);
        const role = snap.docs[0].data().selectedRoleIndex;
        setAppliedRoleIndex(role);
      }
    };

    fetchData();
    checkRequest();
  }, [id, user]);

  const handleSendRequest = async () => {
    if (!post || selectedRoleIndex === null || requestSent) return;
    await addDoc(collection(db, "requests"), {
      sender: user.email,
      receiver: post.userEmail,
      postId: post.id,
      postTitle: post.title,
      selectedRoleIndex,
      status: "sent",
      timestamp: serverTimestamp(),
    });
    setRequestSent(true);
    setAppliedRoleIndex(selectedRoleIndex);
  };

  if (!post) return <div className="container">Loading post details...</div>;

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link to="/logged-homePage">Projects</Link> &gt;{" "}
        <span>{post.title}</span>
      </div>

      <h1 className="page-title">{post.title}</h1>

      <div className="card">
        <div className="card-header">📘 Project Overview</div>
        <Info label="Description" value={post.fullDescription} />
        <Info label="Project Type" value={post.projectType} />
        <Info label="Duration" value={post.duration} />
        <Info label="Team Size" value={post.teamSize} />
      </div>

      <div className="card">
        <div className="card-header">🧑 Creator Details</div>
        <Info label="Name" value={ownerName} />
        <Info label="Email" value={post.userEmail} />
      </div>

      <div className="card">
        <div className="card-header">💡 Skills & Domains</div>
        <Info label="Domains" value={(post.domain || []).join(", ")} />
        <div className="info-row">
          <div className="info-label">Skills Required:</div>
          <div className="info-value tag-container">
            {(post.skillsRequired || []).map((skill, i) => (
              <span className="tag tag-primary" key={i}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <Info label="Technical Knowledge" value={post.technicalKnowledge} />
      </div>

      <div className="card">
        <div className="card-header">📅 Posted On</div>
        <div className="timestamp">
          {post.timestamp?.toDate().toLocaleString()}
        </div>
      </div>

      <div className="card">
        <div className="card-header">🧩 Available Roles</div>
        <div className="roles-container">
          {post.roles?.map((role, i) => {
            const filled = filledRoles[i] || 0;
            const isFilled = filled >= role.count;
            const isSelected = selectedRoleIndex === i;
            const isApplied = appliedRoleIndex === i;

            return (
              <div
                key={i}
                className={`role-card ${isSelected ? "selected" : ""} ${
                  isApplied ? "applied" : ""
                }`}
                onClick={() =>
                  !isFilled && !requestSent && setSelectedRoleIndex(i)
                }
              >
                <div className="role-title">{role.title}</div>
                <div className="info-label">Required Skills:</div>
                <div className="tag-container">
                  {role.skills.map((skill, idx) => (
                    <span className="tag" key={idx}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="members-info">
                  <span>
                    Members: {filled}/{role.count}
                  </span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(filled / role.count) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {isApplied && <div className="applied-badge">✅ Applied</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="action-buttons">
        {requestSent ? (
          <button className="btn btn-success">Request Sent ✓</button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleSendRequest}
            disabled={selectedRoleIndex === null}
          >
            Apply for Selected Role
          </button>
        )}
        <a href={`mailto:${post.userEmail}`} className="btn btn-primary">
          Contact Creator
        </a>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="info-row">
    <div className="info-label">{label}:</div>
    <div className="info-value">{value}</div>
  </div>
);

export default PostDetails;
