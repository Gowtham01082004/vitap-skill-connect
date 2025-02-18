import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  // 🔹 Handle Post Submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !shortDescription.trim() ||
      !fullDescription.trim() ||
      !roles.trim()
    )
      return;

    setLoading(true); // ✅ Start loading

    try {
      await addDoc(collection(db, "posts"), {
        user: user.email,
        title,
        shortDescription,
        fullDescription,
        roles: roles.split(",").map((role) => role.trim()) || [],
        timestamp: serverTimestamp(),
      });

      // ✅ Redirect to home page AFTER state update
      setTimeout(() => {
        setLoading(false);
        navigate("/logged-homepage");
      }, 500);
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
