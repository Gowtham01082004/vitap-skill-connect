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
          ? userDoc.data().name || "Unknown User"
          : "Unknown User";
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

  if (loading) return <p>Loading authentication...</p>;
  if (!user) return <p>You are not logged in. Please log in first.</p>;

  return (
    <div className="logged-home-container">
      <h3>Welcome, {user?.email}</h3>

      <button
        className="create-post-btn"
        onClick={() => navigate("/create-post")}
      >
        ➕ Create New Post
      </button>

      {postsLoading && <p>Loading posts...</p>}

      <div className="posts">
        {posts.length === 0 && !postsLoading ? (
          <p>No posts yet. Start the conversation!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.shortDescription}</p>
              <p>
                <strong>Posted by:</strong>{" "}
                {userNames[post.userId] || "Loading..."}
              </p>
              <ul>
                {(post.roles || []).map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>

              {post.userId !== user.uid && (
                <button
                  onClick={() => navigate(`/post/${post.id}`)}
                  disabled={requestStatus[post.id] === "accepted"}
                  className={
                    requestStatus[post.id] === "accepted"
                      ? "collaborated-btn"
                      : requestStatus[post.id] === "declined"
                      ? "declined-btn"
                      : "collaborate-btn"
                  }
                >
                  {requestStatus[post.id] === "accepted"
                    ? "Collaborated ✅"
                    : requestStatus[post.id] === "declined"
                    ? "Declined ❌"
                    : "Collaborate"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LoggedHomePage;
