import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
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
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.warn("User document does not exist. Creating one...");
          await setDoc(userRef, { email: user.email, createdAt: new Date() });
          setUserData({ email: user.email });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        if (!user) return;

        console.log("Fetching posts for user:", user.email); // ✅ Debugging

        const postsCollection = collection(db, "posts");
        const q = query(
          postsCollection,
          where("userEmail", "==", user.email), // ✅ Ensure field name is correct
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        console.log("Posts fetched:", snapshot.docs.length); // ✅ Check if any posts are retrieved

        const userPostsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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

  // 🔹 Handle Update User Details
  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData, { merge: true }); // ✅ Merge changes
      setEditing(false);
      alert("Profile updated successfully! ✅");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. ❌");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-content">
        <h2>User Profile</h2>

        {editing ? (
          <div className="edit-profile-form">
            <input
              type="text"
              placeholder="Full Name"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Username"
              value={userData.username || ""}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Student ID"
              value={userData.studentID || ""}
              onChange={(e) =>
                setUserData({ ...userData, studentID: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Department"
              value={userData.department || ""}
              onChange={(e) =>
                setUserData({ ...userData, department: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Year of Study"
              value={userData.year || ""}
              onChange={(e) =>
                setUserData({ ...userData, year: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Primary Skills"
              value={userData.primarySkills || ""}
              onChange={(e) =>
                setUserData({ ...userData, primarySkills: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Secondary Skills"
              value={userData.secondarySkills || ""}
              onChange={(e) =>
                setUserData({ ...userData, secondarySkills: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Preferred Project Categories"
              value={userData.projectCategories || ""}
              onChange={(e) =>
                setUserData({ ...userData, projectCategories: e.target.value })
              }
            />
            <button onClick={handleUpdateProfile}>Save Changes</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Name:</strong> {userData.name || "Not Provided"}
            </p>
            <p>
              <strong>Username:</strong> {userData.username || "Not Provided"}
            </p>
            <p>
              <strong>Student ID:</strong>{" "}
              {userData.studentID || "Not Provided"}
            </p>
            <p>
              <strong>Department:</strong>{" "}
              {userData.department || "Not Provided"}
            </p>
            <p>
              <strong>Year of Study:</strong> {userData.year || "Not Provided"}
            </p>
            <p>
              <strong>Primary Skills:</strong>{" "}
              {userData.primarySkills || "Not Provided"}
            </p>
            <p>
              <strong>Secondary Skills:</strong>{" "}
              {userData.secondarySkills || "Not Provided"}
            </p>
            <p>
              <strong>Preferred Project Categories:</strong>{" "}
              {userData.projectCategories || "Not Provided"}
            </p>
            <button onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          </>
        )}

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
