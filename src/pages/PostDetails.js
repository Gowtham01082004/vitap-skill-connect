import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
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
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [ownerName, setOwnerName] = useState("Loading...");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDocRef = doc(db, "posts", id);
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost({ id: postDoc.id, ...postData });

          if (postData.userId) {
            await fetchOwnerName(postData.userId);
          } else {
            console.warn("Missing userId in post data:", postData);
            setOwnerName("Unknown User");
          }
        } else {
          console.error(`No post found for postId: ${id}`);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const fetchOwnerName = async (userId) => {
      try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setOwnerName(userDoc.data().userName || "Unknown User");
        } else {
          console.warn(`No user found for userId: ${userId}`);
          setOwnerName("Unknown User");
        }
      } catch (error) {
        console.error(`Error fetching user data for userId: ${userId}`, error);
        setOwnerName("Unknown User");
      }
    };

    const checkExistingRequest = async () => {
      if (!user) return;
      try {
        const requestsRef = collection(db, "requests");
        const q = query(
          requestsRef,
          where("postId", "==", id),
          where("sender", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setRequestSent(true);
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    };

    fetchPostDetails();
    checkExistingRequest();
  }, [id, user]);

  const handleSendRequest = async () => {
    if (!user || !post?.userEmail) return;
    try {
      await addDoc(collection(db, "requests"), {
        sender: user.email,
        receiver: post.userEmail,
        postId: post.id,
        postTitle: post.title,
        status: "sent",
        timestamp: serverTimestamp(),
      });

      setRequestSent(true);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="post-details-container">
      {post ? (
        <div className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-description">{post.fullDescription}</p>
          <p className="post-owner">
            <strong>Posted by:</strong> {ownerName}
          </p>

          {post.roles && (
            <div className="roles-section">
              <h3>Looking For:</h3>
              <ul className="roles-list">
                {post.roles.map((role, index) => (
                  <li key={index} className="role-tag">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {post.userEmail !== user?.email && (
            <button
              className={`send-request-btn ${requestSent ? "sent" : ""}`}
              onClick={handleSendRequest}
              disabled={requestSent}
            >
              {requestSent ? "Request Sent ✅" : "Collaborate"}
            </button>
          )}
        </div>
      ) : (
        <p className="loading-text">Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
