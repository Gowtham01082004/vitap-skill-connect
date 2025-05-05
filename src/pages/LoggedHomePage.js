import React, { useState, useEffect, useCallback } from "react";
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
import ProjectSkeleton from "../components/ProjectSkeleton";

const LoggedHomePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});
  const [userNames, setUserNames] = useState({});

  const [searchType, setSearchType] = useState("domain");
  const [searchInput, setSearchInput] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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
          setFilteredPosts(postsData);
          fetchUserNames(postsData);
          fetchRequestStatus(postsData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setPostsLoading(false);
      }
    };

    const fetchUserNames = async (posts) => {
      if (!user) return; // ⬅️ Add this to avoid fetching when logged out

      const userMap = {};
      for (const post of posts) {
        if (!post.userId) {
          userMap[post.userId] = "Unknown";
          continue;
        }
        try {
          const userRef = doc(db, "users", post.userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            userMap[post.userId] = userDoc.data().name || "Unknown";
          } else {
            userMap[post.userId] = "Unknown";
          }
        } catch (error) {
          console.error(`Error fetching user ${post.userId}:`, error);
          userMap[post.userId] = "Unknown";
        }
      }
      setUserNames(userMap);
    };

    const fetchRequestStatus = async (posts) => {
      if (!user) return; // ⬅️ Add this to avoid fetching when logged out

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

  // ✅ handleFilter with useCallback to avoid warnings
  const handleFilter = useCallback(() => {
    const queryText = searchInput.toLowerCase();

    const filtered = posts.filter((post) => {
      if (searchType === "domain") {
        return post.domain?.some((d) => d.toLowerCase().includes(queryText));
      } else if (searchType === "name") {
        return post.title?.toLowerCase().includes(queryText);
      } else if (searchType === "skill") {
        return post.skillsRequired?.some((s) =>
          s.toLowerCase().includes(queryText)
        );
      }
      return true;
    });

    setFilteredPosts(filtered);
    setCurrentPage(1); // reset to first page on search
  }, [posts, searchInput, searchType]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) return <p>Loading authentication...</p>;
  if (!user) return <p>You are not logged in. Please log in first.</p>;

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="logged-home-container">
      <div className="header-section">
        <h3>Join Projects</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <select
            className="filter-btn"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="domain">By Domain</option>
            <option value="name">By Name</option>
            <option value="skill">By Skill</option>
          </select>
          <input
            type="text"
            className="filter-btn"
            placeholder={`Search ${searchType}...`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <p className="project-count">
        Showing <span className="highlight">{filteredPosts.length}</span>{" "}
        projects
      </p>

      <div className="project-cards">
        {postsLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          : paginatedPosts.map((post) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default LoggedHomePage;
