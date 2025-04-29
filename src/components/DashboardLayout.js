// src/components/DashboardLayout.js
import React from "react";
import Sidebar from "./Sidebar";
import LoggedNavbar from "./LoggedNavbar";
import "./DashboardLayout.css"; // Create this for layout styling

const DashboardLayout = ({ children }) => {
  return (
    <>
      <LoggedNavbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
