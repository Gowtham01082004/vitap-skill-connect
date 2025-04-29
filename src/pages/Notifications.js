import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./Notifications.css";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Defined and now used

  useEffect(() => {
    if (!user) return; // ✅ Prevents fetch if user is not logged in

    const fetchNotifications = async () => {
      try {
        setLoading(true); // ✅ Start loading state
        const notificationsRef = collection(db, "notifications");
        const q = query(notificationsRef, where("receiver", "==", user.email));
        const snapshot = await getDocs(q);
        setNotifications(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false); // ✅ Stop loading state
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    <>
      <div className="notifications-container">
        <h2>Notifications</h2>

        {/* ✅ Show Loading Text While Fetching */}
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-card">
                <p>{notification.message}</p>
                <small>
                  {new Date(notification.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notifications;
