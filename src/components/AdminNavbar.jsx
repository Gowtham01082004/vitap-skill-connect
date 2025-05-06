import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin");
  };

  return (
    <header className="admin-header">
      <div className="admin-logo">
  
        <span className="logo-text">
          VIT AP<span>SkillConnect</span> Admin
        </span>
      </div>

      <div className="admin-actions">
        <div className="admin-email">admin@vitassist.com</div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
