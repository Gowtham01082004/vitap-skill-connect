import React, { useEffect, useState } from "react";
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
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";

const predefinedCategories = [
  "AI/ML",
  "Fullstack",
  "Blockchain",
  "App Dev",
  "Cloud",
  "Cybersecurity",
];

const getRandomColor = () => {
  const colors = [
    "#00e5ff",
    "#6c5ce7",
    "#ff1744",
    "#00c853",
    "#ff9100",
    "#f50057",
    "#8e24aa",
    "#43a047",
    "#3949ab",
    "#e53935",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [collaboratedPosts, setCollaboratedPosts] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      setLoadingUser(true);
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          ...data,
          primarySkills:
            data.primarySkills?.split(",").map((s) => s.trim()) || [],
          projectCategories:
            data.projectCategories?.split(",").map((c) => c.trim()) || [],
        });
        setSelectedCategories(
          data.projectCategories?.split(",").map((c) => c.trim()) || []
        );
      } else {
        await setDoc(userRef, { email: user.email, createdAt: new Date() });
        setUserData({ email: user.email });
      }
      setLoadingUser(false);
    };

    const fetchUserPosts = async () => {
      setLoadingPosts(true);
      const postQuery = query(
        collection(db, "posts"),
        where("userEmail", "==", user.email),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(postQuery);
      setUserPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoadingPosts(false);
    };

    const fetchCollaboratedPosts = async () => {
      const requestQuery = query(
        collection(db, "requests"),
        where("sender", "==", user.email),
        where("status", "==", "accepted")
      );
      const requestSnapshot = await getDocs(requestQuery);

      const postIds = requestSnapshot.docs.map((doc) => doc.data().postId);
      if (postIds.length === 0) return;

      const postsSnapshot = await Promise.all(
        postIds.map((postId) => getDoc(doc(db, "posts", postId)))
      );
      const posts = postsSnapshot
        .filter((doc) => doc.exists())
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setCollaboratedPosts(posts);
    };

    fetchUserData();
    fetchUserPosts();
    fetchCollaboratedPosts();
  }, [user]);

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    setUserPosts(userPosts.filter((post) => post.id !== postId));
  };

  const handleUpdateProfile = async () => {
    const updatedData = {
      ...userData,
      primarySkills: userData.primarySkills?.join(", "),
      projectCategories: selectedCategories.join(", "),
    };
    await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const addCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (
      trimmed &&
      !userData.primarySkills.includes(trimmed) &&
      trimmed.length <= 20
    ) {
      setUserData({
        ...userData,
        primarySkills: [...userData.primarySkills, trimmed],
      });
    }
    setCustomSkillInput("");
  };

  const removeSkill = (skill) => {
    setUserData({
      ...userData,
      primarySkills: userData.primarySkills.filter((s) => s !== skill),
    });
  };

  const toggleCategory = (cat) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(updated);
  };

  return (
    <div className="profile-dashboard-container">
      <div className="profile-grid">
        {/* Left Panel */}
        <div className="profile-card">
          <div className="profile-banner">
            <div className="profile-avatar">
              {userData.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
          <div className="profile-body">
            {editing ? (
              <>
                <label className="input-label">
                  Name
                  <input
                    type="text"
                    value={userData.name || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="edit-input"
                  />
                </label>
                <label className="input-label">
                  Username (not editable)
                  <input
                    type="text"
                    value={userData.username || ""}
                    className="edit-input"
                    disabled
                  />
                </label>
                <label className="input-label">
                  Student ID
                  <input
                    type="text"
                    value={userData.studentID || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, studentID: e.target.value })
                    }
                    className="edit-input"
                  />
                </label>
                <label className="input-label">
                  Department
                  <input
                    type="text"
                    value={userData.department || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, department: e.target.value })
                    }
                    className="edit-input"
                  />
                </label>
                <label className="input-label">
                  Year of Study
                  <input
                    type="text"
                    value={userData.year || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, year: e.target.value })
                    }
                    className="edit-input"
                  />
                </label>

                <label className="input-label">Primary Skills</label>
                <div className="pill-container">
                  {userData.primarySkills?.map((skill, i) => (
                    <span
                      key={i}
                      className="pill selected"
                      style={{ backgroundColor: getRandomColor() }}
                      onClick={() => removeSkill(skill)}
                    >
                      {skill} &times;
                    </span>
                  ))}
                </div>
                <div className="custom-skill-input-row">
                  <input
                    type="text"
                    placeholder="Add custom skill"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                    className="edit-input"
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addCustomSkill}
                  >
                    Add
                  </button>
                </div>

                <label className="input-label">Preferred Categories</label>
                <div className="pill-container">
                  {predefinedCategories.map((cat, i) => (
                    <span
                      key={i}
                      className={`pill ${
                        selectedCategories.includes(cat) ? "selected" : ""
                      }`}
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="button-group">
                  <button
                    onClick={handleUpdateProfile}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{userData.name || "Your Name"}</h2>
                <p className="subtext">Computer Science Student</p>
                <div className="details">
                  <div className="detail-group">
                    <label>Email</label>
                    <p>{userData.email || user?.email}</p>
                  </div>
                  <div className="detail-group">
                    <label>Username</label>
                    <p>{userData.username || "Not Provided"}</p>
                  </div>
                  <div className="detail-group">
                    <label>Student ID</label>
                    <p>{userData.studentID || "Not Provided"}</p>
                  </div>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => setEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="info-section">
          <div className="info-card">
            <h3>Academic Information</h3>
            <div className="info-columns">
              <div>
                <p className="label">Department</p>
                <p className="value">{userData.department || "Not Provided"}</p>
              </div>
              <div>
                <p className="label">Year of Study</p>
                <p className="value">{userData.year || "Not Provided"}</p>
              </div>
            </div>
            <div className="info-columns">
              <div>
                <p className="label">Primary Skills</p>
                <div className="tag-container">
                  {userData.primarySkills?.map((skill, i) => (
                    <span className="tag" key={i}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="label">Preferred Categories</p>
                <div className="tag-container">
                  {selectedCategories?.map((cat, i) => (
                    <span className="tag" key={i}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>My Projects</h3>
            {loadingPosts ? (
              <p className="subtext">Loading your posts...</p>
            ) : userPosts.length === 0 ? (
              <p className="subtext">No posts yet.</p>
            ) : (
              <ul className="user-posts-list">
                {userPosts.map((post) => (
                  <li className="post-item" key={post.id}>
                    <p>
                      <strong>{post.title}</strong>
                    </p>
                    <p>{post.description}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      🗑 Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="info-card">
            <h3>Collaborated Projects</h3>
            {loadingPosts ? (
              <p className="subtext">Loading collaborations...</p>
            ) : collaboratedPosts.length === 0 ? (
              <p className="subtext">You haven't joined any projects yet.</p>
            ) : (
              <ul className="user-posts-list">
                {collaboratedPosts.map((post) => (
                  <li className="post-item" key={post.id}>
                    <p>
                      <strong>{post.title}</strong>
                    </p>
                    <p>{post.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
