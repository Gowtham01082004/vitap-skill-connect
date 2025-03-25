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
  const [filledRoles, setFilledRoles] = useState({});
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

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
            fetchFilledRoles(postDoc.id, postData.roles);
          } else {
            setOwnerName("Unknown User");
          }
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const fetchOwnerName = async (userId) => {
      try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        setOwnerName(userDoc.exists() ? userDoc.data().userName : "Unknown");
      } catch {
        setOwnerName("Unknown");
      }
    };

    const fetchFilledRoles = async (postId, roles) => {
      const requestRef = collection(db, "requests");
      const q = query(
        requestRef,
        where("postId", "==", postId),
        where("status", "==", "accepted")
      );
      const snapshot = await getDocs(q);
      const roleCounts = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.selectedRoleIndex !== undefined) {
          roleCounts[data.selectedRoleIndex] =
            (roleCounts[data.selectedRoleIndex] || 0) + 1;
        }
      });

      setFilledRoles(roleCounts);
    };

    const checkExistingRequest = async () => {
      if (!user) return;
      const requestsRef = collection(db, "requests");
      const q = query(
        requestsRef,
        where("postId", "==", id),
        where("sender", "==", user.email)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) setRequestSent(true);
    };

    fetchPostDetails();
    checkExistingRequest();
  }, [id, user]);

  const handleSendRequest = async () => {
    if (!user || !post || selectedRoleIndex === null) return;
    try {
      await addDoc(collection(db, "requests"), {
        sender: user.email,
        receiver: post.userEmail,
        postId: post.id,
        postTitle: post.title,
        status: "sent",
        selectedRoleIndex,
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
          <h2>{post.title}</h2>
          <p>{post.fullDescription}</p>
          <p>
            <strong>Posted by:</strong> {ownerName}
          </p>

          <h3>Available Roles:</h3>
          <div className="roles-grid">
            {post.roles?.map((role, index) => {
              const isFilled = filledRoles[index] >= role.count;
              const isSelected = selectedRoleIndex === index;

              return (
                <div
                  key={index}
                  className={`role-card ${isFilled ? "filled" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() =>
                    !isFilled && !requestSent && setSelectedRoleIndex(index)
                  }
                >
                  <h4>{role.title}</h4>
                  <p>
                    <strong>Required Skills:</strong> {role.skills.join(", ")}
                  </p>
                  <p>
                    <strong>Members:</strong> {filledRoles[index] || 0} /{" "}
                    {role.count}
                  </p>
                  {isFilled && (
                    <span className="badge filled-badge">Filled</span>
                  )}
                  {isSelected && !isFilled && (
                    <span className="badge selected-badge">Selected</span>
                  )}
                </div>
              );
            })}
          </div>

          {post.userEmail !== user?.email && (
            <button
              className={`send-request-btn ${requestSent ? "sent" : ""}`}
              onClick={handleSendRequest}
              disabled={
                requestSent ||
                selectedRoleIndex === null ||
                filledRoles[selectedRoleIndex] >=
                  post.roles[selectedRoleIndex]?.count
              }
            >
              {requestSent ? "Request Sent ✅" : "Apply for Selected Role"}
            </button>
          )}
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
