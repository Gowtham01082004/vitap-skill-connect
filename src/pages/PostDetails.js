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
  serverTimestamp, // ✅ Import serverTimestamp correctly
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() });
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    // 🔹 Check if request has already been sent
    const checkExistingRequest = async () => {
      if (!user) return; // ✅ Prevent fetching if user is not logged in

      const requestsRef = collection(db, "requests");
      const q = query(
        requestsRef,
        where("postId", "==", id),
        where("sender", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setRequestSent(true); // ✅ Request already sent
      }
    };

    fetchPostDetails();
    checkExistingRequest();
  }, [id, user]);

  // 🔹 Handle Send Request
  const handleSendRequest = async () => {
    if (!user || !post?.user) return; // ✅ Ensure both user & post owner exist

    try {
      await addDoc(collection(db, "requests"), {
        sender: user.email, // ✅ Request sender (logged-in user)
        receiver: post.user || "unknown", // ✅ Ensure receiver is always defined
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
          <p>{post.description}</p>
          <p>
            <strong>Posted by:</strong> {post.owner}
          </p>

          {/* 🔹 Send Request Button */}
          <button
            className="send-request-btn"
            onClick={handleSendRequest}
            disabled={requestSent} // ✅ Disable if already sent
          >
            {requestSent ? "Request Sent ✅" : "Send Request"}
          </button>
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
