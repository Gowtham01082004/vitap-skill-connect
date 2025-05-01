// src/components/DashboardLayout.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LoggedNavbar from "./LoggedNavbar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <LoggedNavbar onSidebarToggle={handleSidebarToggle} />
      <div className="dashboard-layout">
        <Sidebar
          isMobileSidebarVisible={sidebarVisible}
          toggleSidebar={handleSidebarToggle}
        />
        <main className="dashboard-main">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
