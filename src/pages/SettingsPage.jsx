import React, { useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    setDeleting(true);
    setMessage("Deleting your account and data...");

    try {
      // 1️⃣ Delete user document
      await deleteDoc(doc(db, "users", user.uid));

      // 2️⃣ Delete all posts created by the user
      const postsQuery = query(
        collection(db, "posts"),
        where("userEmail", "==", user.email)
      );
      const postsSnap = await getDocs(postsQuery);
      for (const post of postsSnap.docs) {
        await deleteDoc(doc(db, "posts", post.id));
      }

      // 3️⃣ Delete all requests sent by the user
      const reqQuery = query(
        collection(db, "requests"),
        where("sender", "==", user.email)
      );
      const reqSnap = await getDocs(reqQuery);
      for (const req of reqSnap.docs) {
        await deleteDoc(doc(db, "requests", req.id));
      }

      // 4️⃣ Delete all discussion questions by the user
      const questionsQuery = query(
        collection(db, "discussionQuestions"),
        where("email", "==", user.email)
      );
      const questionsSnap = await getDocs(questionsQuery);
      for (const q of questionsSnap.docs) {
        await deleteDoc(doc(db, "discussionQuestions", q.id));
      }

      // 5️⃣ Delete all discussion answers by the user
      const answersQuery = query(
        collection(db, "discussionAnswers"),
        where("userId", "==", user.uid)
      );
      const answersSnap = await getDocs(answersQuery);
      for (const ans of answersSnap.docs) {
        await deleteDoc(doc(db, "discussionAnswers", ans.id));
      }

      // 6️⃣ Delete the user account from Auth
      await deleteUser(auth.currentUser);

      setMessage("Your account and data have been deleted.");
      navigate("/auth");
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage("Failed to delete account. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p>Manage your account settings below.</p>

      <div className="settings-section">
        <h3>Danger Zone</h3>
        <p>
          Deleting your account will permanently remove your data including your
          profile, posts, requests, and comments.
        </p>
        <button
          className="delete-account-btn"
          onClick={handleDeleteAccount}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete My Account"}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SettingsPage;
