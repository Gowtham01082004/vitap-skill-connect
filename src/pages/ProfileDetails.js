import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const ProfileDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uid, email } = location.state || {}; // ✅ Get UID and email from AuthPage

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [studentID, setStudentID] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [primarySkills, setPrimarySkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [projectCategories, setProjectCategories] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      !primarySkills
    ) {
      setError("All required fields must be filled.");
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, "users", uid), {
        name,
        username,
        email,
        studentID,
        department,
        year,
        primarySkills,
        secondarySkills,
        projectCategories,
        createdAt: new Date(),
      });

      navigate("/logged-homepage");
    } catch (error) {
      setError("Error saving profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student ID (e.g., 21BCB7033)"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department/Major"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Year of Study"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Primary Skills (comma-separated)"
          value={primarySkills}
          onChange={(e) => setPrimarySkills(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Secondary Skills (Optional)"
          value={secondarySkills}
          onChange={(e) => setSecondarySkills(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preferred Project Categories"
          value={projectCategories}
          onChange={(e) => setProjectCategories(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit & Continue"}
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
