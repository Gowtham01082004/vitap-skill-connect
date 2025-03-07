import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [roles, setRoles] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // ✅ Store user details

  // 🔹 Fetch User Details from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data()); // ✅ Store user details
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // 🔹 Handle Post Submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !shortDescription.trim() ||
      !fullDescription.trim() ||
      !roles.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      // ✅ Ensure `userId` and `userEmail` are stored correctly
      await addDoc(collection(db, "posts"), {
        userId: user.uid, // ✅ Ensure UID is stored
        userEmail: user.email, // ✅ Store email separately
        userName: userData?.name || "Unknown", // ✅ Store user's name
        title,
        shortDescription,
        fullDescription,
        roles: roles.split(",").map((role) => role.trim()) || [],
        timestamp: serverTimestamp(),
      });

      setLoading(false);
      navigate("/logged-homepage"); // ✅ Redirect after post creation
    } catch (error) {
      console.error("Error adding post:", error);
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Short Project Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Full Project Description (Detailed Overview)"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Required Roles (comma-separated)"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
