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
        sender: user.email, // ✅ Store sender's email
        receiver: post.userEmail, // ✅ Store receiver's email
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
        <>
          <h2>{post.title}</h2>
          <p>{post.fullDescription}</p>
          <p>
            <strong>Posted by:</strong> {ownerName}
          </p>

          {/* ✅ Show "Collaborate" button ONLY if the logged-in user is NOT the post owner */}
          {post.userEmail !== user?.email && (
            <button
              className="send-request-btn"
              onClick={handleSendRequest}
              disabled={requestSent}
            >
              {requestSent ? "Request Sent ✅" : "Collaborate"}
            </button>
          )}
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
