import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoggedHomePage.css";
import ProjectSkeleton from "../components/ProjectSkeleton"; // ✅ Corrected import

const LoggedHomePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      if (!user) return;

      try {
        setPostsLoading(true);
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);

        if (isMounted) {
          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts(postsData);
          setPostsLoading(false);

          fetchUserNames(postsData);
          fetchRequestStatus(postsData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPostsLoading(false);
      }
    };

    const fetchUserNames = async (posts) => {
      const userMap = {};
      for (const post of posts) {
        const userRef = doc(db, "users", post.userId);
        const userDoc = await getDoc(userRef);
        userMap[post.userId] = userDoc.exists()
          ? userDoc.data().name || "Unknown"
          : "Unknown";
      }
      setUserNames(userMap);
    };

    const fetchRequestStatus = async (posts) => {
      if (!user) return;
      const requestStatusMap = {};

      for (const post of posts) {
        const requestsRef = collection(db, "requests");
        const requestQuery = query(
          requestsRef,
          where("postId", "==", post.id),
          where("sender", "==", user.email)
        );
        const requestSnapshot = await getDocs(requestQuery);

        if (!requestSnapshot.empty) {
          requestStatusMap[post.id] = requestSnapshot.docs[0].data().status;
        }
      }

      setRequestStatus(requestStatusMap);
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) return <p>Loading authentication...</p>;
  if (!user) return <p>You are not logged in. Please log in first.</p>;

  return (
    <div className="logged-home-container">
      <div className="header-section">
        <h3>Join Projects</h3>
        <button className="filter-btn">Filter</button>
      </div>

      <p className="project-count">
        Showing <span className="highlight">{posts.length}</span> available
        projects
      </p>

      <div className="project-cards">
        {postsLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          : posts.map((post) => (
              <div key={post.id} className="project-card">
                <div className="card-header">
                  <h4 className="project-title">{post.title}</h4>
                  <span className="project-tag">
                    {post.domain?.[0] || "General"}
                  </span>
                </div>

                <p className="project-dept">
                  {post.department || "Engineering"}
                </p>

                <p className="project-desc">
                  {post.fullDescription?.slice(0, 150) ||
                    "No description available."}
                </p>

                <div className="project-meta">
                  <span>🕒 Duration: {post.duration}</span>
                  <span>👥 Team Size: {post.teamSize || "N/A"}</span>
                </div>

                <div className="project-skills">
                  {(post.skillsRequired || []).map((skill, i) => (
                    <span key={i} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="mentor-info">
                    <div className="mentor-avatar">
                      {getInitials(userNames[post.userId] || "")}
                    </div>
                    <span>{userNames[post.userId] || "Loading..."}</span>
                  </div>

                  {post.userId !== user.uid && (
                    <button
                      onClick={() => navigate(`/post/${post.id}`)}
                      disabled={requestStatus[post.id] === "accepted"}
                      className={`apply-btn ${
                        requestStatus[post.id] === "accepted"
                          ? "applied"
                          : requestStatus[post.id] === "declined"
                          ? "declined"
                          : ""
                      }`}
                    >
                      {requestStatus[post.id] === "accepted"
                        ? "Applied ✅"
                        : requestStatus[post.id] === "declined"
                        ? "Declined ❌"
                        : "Apply"}
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LoggedHomePage;
