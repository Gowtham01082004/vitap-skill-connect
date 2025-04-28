import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalUsers: 0,
    activeUsersNow: 0,
    newSignupsToday: 0,
    pendingRequests: 0,
    mostPopularCategory: "",
  });

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Total Users
      const userSnap = await getDocs(collection(db, "users"));
      const users = userSnap.docs.map((doc) => doc.data());

      // 2. Active Users (isOnline = true)
      const activeUsers = users.filter((user) => user.isOnline).length;

      // 3. New Signups Today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newSignups = users.filter((user) => {
        const createdAt = user.createdAt?.toDate?.() || new Date();
        return createdAt >= today;
      }).length;

      // 4. Total Projects
      const projectSnap = await getDocs(collection(db, "posts"));
      const projects = projectSnap.docs.map((doc) => doc.data());

      // 5. Most Popular Category (based on project domains)
      const categoryCount = {};
      projects.forEach((p) => {
        p.domain?.forEach((domain) => {
          categoryCount[domain] = (categoryCount[domain] || 0) + 1;
        });
      });
      const mostPopularCategory =
        Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "N/A";

      // 6. Pending Requests
      const reqSnap = await getDocs(
        query(collection(db, "requests"), where("status", "==", "pending"))
      );
      const pendingCount = reqSnap.size;

      setStats({
        totalProjects: projects.length,
        totalUsers: users.length,
        activeUsersNow: activeUsers,
        newSignupsToday: newSignups,
        pendingRequests: pendingCount,
        mostPopularCategory,
      });
    };

    fetchStats();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <AdminSidebar />
        <div className="admin-dashboard" style={{ flex: 1, padding: "30px" }}>
          <h2 style={{ color: "#fff", marginBottom: "30px" }}>
            Admin Dashboard – Real-Time Metrics
          </h2>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              📁 Total Projects: <strong>{stats.totalProjects}</strong>
            </div>
            <div className="dashboard-card">
              👥 Registered Users: <strong>{stats.totalUsers}</strong>
            </div>
            <div className="dashboard-card">
              🟢 Active Users Now: <strong>{stats.activeUsersNow}</strong>
            </div>
            <div className="dashboard-card">
              🆕 New Signups Today: <strong>{stats.newSignupsToday}</strong>
            </div>
            <div className="dashboard-card">
              📨 Pending Requests: <strong>{stats.pendingRequests}</strong>
            </div>
            <div className="dashboard-card">
              🔥 Popular Category: <strong>{stats.mostPopularCategory}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
