import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import "./ProfileDetails.css";

const skillsList = [
  "React",
  "Node.js",
  "AWS",
  "Firebase",
  "Tailwind",
  "Python",
];

const categoriesList = ["Fullstack", "AI/ML", "Blockchain", "UI/UX", "DevOps"];

const ProfileDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uid, email } = location.state || {}; // From AuthPage after signup

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [studentID, setStudentID] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [primarySkills, setPrimarySkills] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [projectCategories, setProjectCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSkillToggle = (skill) => {
    setPrimarySkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleCategoryToggle = (cat) => {
    setProjectCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleCustomSkillAdd = () => {
    const trimmed = customSkillInput.trim();
    if (trimmed && !primarySkills.includes(trimmed)) {
      setPrimarySkills((prev) => [...prev, trimmed]);
    }
    setCustomSkillInput("");
  };

  const checkUsernameAvailability = async (usernameToCheck) => {
    const q = query(
      collection(db, "users"),
      where("username", "==", usernameToCheck.toLowerCase())
    );
    const snapshot = await getDocs(q);
    return snapshot.empty; // true if available
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !name ||
      !username ||
      !studentID ||
      !department ||
      !year ||
      primarySkills.length === 0
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const available = await checkUsernameAvailability(username);
    if (!available) {
      setError("Username is already taken. Please choose another.");
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, "users", uid), {
        uid,
        email,
        name,
        username: username.toLowerCase(),
        studentID,
        department,
        year,
        primarySkills,
        secondarySkills,
        projectCategories,
        profileCompleted: true,
        createdAt: new Date(),
      });

      navigate("/logged-homepage");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-container">
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          required
        />

        <label>Student ID</label>
        <input
          type="text"
          placeholder="Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          required
        />

        <label>Department</label>
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <label>Year of Study</label>
        <input
          type="text"
          placeholder="Year of Study"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <label>Primary Skills</label>
        <div className="pill-container">
          {skillsList.map((skill) => (
            <div
              key={skill}
              className={`pill ${
                primarySkills.includes(skill) ? "selected" : ""
              }`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="custom-skill-input-row">
          <input
            type="text"
            placeholder="Add custom skill"
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCustomSkillAdd();
              }
            }}
          />
          <button
            type="button"
            className="btn-add"
            onClick={handleCustomSkillAdd}
          >
            Add
          </button>
        </div>

        <label>Secondary Skills (Optional)</label>
        <input
          type="text"
          placeholder="Secondary Skills"
          value={secondarySkills}
          onChange={(e) => setSecondarySkills(e.target.value)}
        />

        <label>Preferred Project Categories</label>
        <div className="pill-container">
          {categoriesList.map((cat) => (
            <div
              key={cat}
              className={`pill ${
                projectCategories.includes(cat) ? "selected" : ""
              }`}
              onClick={() => handleCategoryToggle(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit & Continue"}
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
