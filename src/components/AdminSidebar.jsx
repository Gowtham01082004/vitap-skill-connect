import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-title">Admin Panel</div>
      <nav className="sidebar-nav">
        <Link
          to="/admin-dashboard"
          className={isActive("/admin-dashboard") ? "active" : ""}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/admin-pyq-upload"
          className={isActive("/admin-pyq-upload") ? "active" : ""}
        >
          📚 PYQ Upload
        </Link>
        <Link
          to="/admin-users"
          className={isActive("/admin-users") ? "active" : ""}
        >
          👥 Users
        </Link>
        <Link
          to="/admin-projects"
          className={isActive("/admin-projects") ? "active" : ""}
        >
          🧠 Projects
        </Link>
        <Link
          to="/admin-settings"
          className={isActive("/admin-settings") ? "active" : ""}
        >
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
