import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <div
          className="admin-dashboard"
          style={{ marginLeft: "220px", width: "100%" }}
        >
          <h2>Admin Dashboard - Upload Previous Year Papers</h2>
          {/* Upload form & content */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
