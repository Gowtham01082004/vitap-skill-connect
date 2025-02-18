import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  getDoc,
  setDoc, // ✅ Use setDoc to create if missing
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "No Name Set");
          setNewName(userDoc.data().name || "");
        } else {
          console.warn("User document does not exist. Creating one...");
          await setDoc(userRef, { name: user.displayName || "New User" });
          setUserName(user.displayName || "New User");
          setNewName(user.displayName || "New User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const userPostsData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((post) => post.user === user.email);
        setUserPosts(userPostsData);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [user]);

  // 🔹 Handle Delete Post
  const handleDeletePost = async (postId) => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        setUserPosts(userPosts.filter((post) => post.id !== postId));
        alert("Post deleted successfully! ✅");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. ❌ Check Firestore security rules.");
      }
    }
  };

  // 🔹 Handle Update Name
  const handleUpdateName = async () => {
    if (!user || newName.trim() === "") return;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { name: newName }, { merge: true }); // ✅ `setDoc` ensures the document exists
      setUserName(newName);
      setEditing(false);
      alert("Name updated successfully! ✅");
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Failed to update name. ❌");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-content">
        <h2>User Profile</h2>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Name:</strong>{" "}
          {editing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={handleUpdateName}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              {userName}{" "}
              <button onClick={() => setEditing(true)}>✏️ Edit</button>
            </>
          )}
        </p>
        <p>
          <strong>Total Posts:</strong> {userPosts.length}
        </p>

        <h3>Your Posts</h3>
        {userPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="user-posts-list">
            {userPosts.map((post) => (
              <li key={post.id} className="post-item">
                <p>
                  <strong>{post.title}</strong>
                </p>
                <p>{post.description}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePost(post.id)}
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
