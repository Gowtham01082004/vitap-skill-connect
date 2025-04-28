import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";
import { blueGrey } from "@mui/material/colors";

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
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    primarySkills: [],
    projectCategories: [],
  });
  const [editing, setEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [collaboratedPosts, setCollaboratedPosts] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch user data
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const primarySkills = Array.isArray(data.primarySkills)
            ? data.primarySkills
            : data.primarySkills
                ?.split(",")
                .map((s) => s.trim())
                .filter(Boolean) || [];

          const projectCategories = Array.isArray(data.projectCategories)
            ? data.projectCategories
            : data.projectCategories
                ?.split(",")
                .map((c) => c.trim())
                .filter(Boolean) || [];

          setUserData({
            ...data,
            email: user.email,
            primarySkills,
            projectCategories,
          });

          setSelectedCategories(projectCategories);
        } else {
          // Initialize with email if user doc doesn't exist yet
          setUserData((prev) => ({
            ...prev,
            email: user.email,
          }));
        }

        // Fetch user created posts
        const postSnap = await getDocs(
          query(collection(db, "posts"), where("userEmail", "==", user.email))
        );
        setUserPosts(
          postSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        // Fetch collaborated posts
        const reqSnap = await getDocs(
          query(
            collection(db, "requests"),
            where("sender", "==", user.email),
            where("status", "==", "accepted")
          )
        );

        // More efficient batch fetching for collaborations
        const postIds = reqSnap.docs.map((doc) => doc.data().postId);

        if (postIds.length > 0) {
          // Batch fetch in chunks of 10 (Firestore limitation)
          const fetchedPosts = [];
          for (let i = 0; i < postIds.length; i += 10) {
            const batch = postIds.slice(i, i + 10);
            const batchSnap = await getDocs(
              query(collection(db, "posts"), where("__name__", "in", batch))
            );
            fetchedPosts.push(
              ...batchSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          }
          setCollaboratedPosts(fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      if (!user) return;

      // Store arrays directly rather than converting to strings
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: userData.name,
          department: userData.department,
          year: userData.year,
          primarySkills: userData.primarySkills,
          projectCategories: selectedCategories,
        },
        { merge: true }
      );

      // Update local state to reflect changes
      setUserData((prev) => ({
        ...prev,
        projectCategories: selectedCategories,
      }));

      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const addCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (trimmed && !userData.primarySkills.includes(trimmed)) {
      setUserData((prev) => ({
        ...prev,
        primarySkills: [...prev.primarySkills, trimmed],
      }));
      setCustomSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setUserData((prev) => ({
      ...prev,
      primarySkills: prev.primarySkills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="profile-banner">
        <div className="profile-content">
          <div className="profile-avatar">
            {userData.name?.charAt(0).toUpperCase() ||
              user.email?.charAt(0).toUpperCase() ||
              "U"}
          </div>
          <div className="profile-info-text">
            <h2>{userData.name || "Your Name"}</h2>
            <p>{userData.email}</p>
            <button className="edit-btn" onClick={() => setEditing(!editing)}>
              {editing ? "Cancel" : "Edit Profile"}
            </button>
            {editing && (
              <button onClick={handleUpdateProfile} className="save-btn">
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <div className="edit-section">
          <input
            type="text"
            value={userData.name || ""}
            placeholder="Name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <input
            type="text"
            value={userData.department || ""}
            placeholder="Department"
            onChange={(e) =>
              setUserData({ ...userData, department: e.target.value })
            }
          />
          <input
            type="text"
            value={userData.year || ""}
            placeholder="Year"
            onChange={(e) => setUserData({ ...userData, year: e.target.value })}
          />
        </div>
      )}

      <div className="profile-grid">
        <div className="info-card">
          <h3>Academic Info</h3>
          <p>
            <strong>Department:</strong> {userData.department || "Not Provided"}
          </p>
          <p>
            <strong>Year:</strong> {userData.year || "Not Provided"}
          </p>
        </div>

        <div className="info-card">
          <h3>Primary Skills</h3>
          <div className="tag-container">
            {userData.primarySkills?.map((skill, i) => (
              <span
                key={i}
                className="tag skill-tag"
                style={{ backgroundColor: blueGrey[600] }}
              >
                {skill}
                {editing && (
                  <span
                    className="remove-skill"
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </span>
                )}
              </span>
            ))}
          </div>
          {editing && (
            <div className="skill-input-wrapper">
              <input
                type="text"
                className="skill-input"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Add a new skill"
                onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
              />
              <button className="add-skill-btn" onClick={addCustomSkill}>
                Add
              </button>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>Preferred Categories</h3>
          <div className="tag-container">
            {predefinedCategories.map((cat, i) => (
              <span
                key={i}
                className={`tag ${
                  selectedCategories.includes(cat) ? "selected" : ""
                }`}
                onClick={() => editing && toggleCategory(cat)}
                style={{ cursor: editing ? "pointer" : "default" }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h3>My Projects</h3>
          {loadingPosts ? (
            <p>Loading projects...</p>
          ) : userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post.id} className="project-item">
                {post.title}
              </div>
            ))
          ) : (
            <p>No projects created yet.</p>
          )}
        </div>

        <div className="info-card">
          <h3>Collaborated Projects</h3>
          {loadingPosts ? (
            <p>Loading collaborations...</p>
          ) : collaboratedPosts.length > 0 ? (
            collaboratedPosts.map((post) => (
              <div key={post.id} className="project-item">
                {post.title}
              </div>
            ))
          ) : (
            <p>No collaborations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
