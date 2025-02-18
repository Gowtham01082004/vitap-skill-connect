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
  const { user, loading } = useAuth(); // ✅ Includes authentication loading state
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});
  const [userNames, setUserNames] = useState({});

  // ✅ UseEffect must always be called at the top level of the component
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
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
        if (isMounted) setPostsLoading(false);
      }
    };

    const fetchUserNames = async (posts) => {
      try {
        const uniqueUserIds = [...new Set(posts.map((post) => post.user))];
        const userMap = {};

        for (const userEmail of uniqueUserIds) {
          const userRef = doc(db, "users", userEmail);
          const userDoc = await getDoc(userRef);
          userMap[userEmail] = userDoc.exists()
            ? userDoc.data().name || "Unknown User"
            : "Unknown User";
        }

        setUserNames(userMap);
      } catch (error) {
        console.error("Error fetching user names:", error);
      }
    };

    const fetchRequestStatus = async (fetchedPosts) => {
      if (!user) return;
      const requestStatusMap = {};

      for (const post of fetchedPosts) {
        const requestsRef = collection(db, "requests");
        const requestQuery = query(
          requestsRef,
          where("postId", "==", post.id),
          where("sender", "==", user.email)
        );
        const requestSnapshot = await getDocs(requestQuery);

        if (!requestSnapshot.empty) {
          const request = requestSnapshot.docs[0].data();
          requestStatusMap[post.id] = request.status;
        }
      }

      if (isMounted) {
        setRequestStatus(requestStatusMap);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // ✅ Move conditional rendering inside JSX
  if (loading) {
    return <p>Loading authentication...</p>;
  }

  if (!user) {
    return <p>You are not logged in. Please log in first.</p>;
  }

  return (
    <div className="logged-home-container">
      <h3>Welcome, {user?.email}</h3>

      <button
        className="create-post-btn"
        onClick={() => navigate("/create-post")}
      >
        ➕ Create New Post
      </button>

      {postsLoading ? <p>Loading posts...</p> : null}

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
                {userNames[post.user] || "Loading..."}
              </p>
              <ul>
                {(post.roles || []).map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>

              {post.user !== user.email && (
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
