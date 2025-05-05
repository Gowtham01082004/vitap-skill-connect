// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./components/Navbar";
import TeamMemberInfoPage from "./pages/TeamMemberInfoPage";
import LoggedNavbar from "./components/LoggedNavbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import AttendanceCalculator from "./pages/AttendanceCalculator";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SettingsPage from "./pages/SettingsPage";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./pages/FAQ";
import AuthPage from "./pages/AuthPage";
import Roadmap from "./pages/Roadmap";
import ProfileDetails from "./pages/ProfileDetails";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ChatbotPage from "./pages/ChatbotPage";
import Chatbot from "./components/Chatbot";
import AdminPYQUpload from "./pages/AdminPYQUpload";
import ViewPYQPage from "./pages/ViewPYQPage";
import Dashboard from "./pages/Dashboard";
import MyProjects from "./pages/MyProjects";
import LoggedHomePage from "./pages/LoggedHomePage";
import ProfilePage from "./pages/ProfilePage";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import RequestsInbox from "./pages/RequestsInbox";
import Notifications from "./pages/Notifications";
import CgpaCalculator from "./pages/CgpaCalculator";
import AdminLogin from "./pages/AdminLogin";
import CompleteProjectView from "./pages/CompleteProjectView";
import AdminDashboard from "./pages/AdminDashboard";
import MobileRoadmap from "./pages/roadmaps/MobileRoadmap";
import WebDevelopmentRoadmap from "./pages/roadmaps/WebDevelopmentRoadmap";
import DataScienceRoadmap from "./pages/roadmaps/DataScienceRoadmap";
import CybersecurityRoadmap from "./pages/roadmaps/CybersecurityRoadmap";
import DevOpsCloudRoadmap from "./pages/roadmaps/DevOpsCloudRoadmap";
import BlockchainRoadmap from "./pages/roadmaps/BlockchainRoadmap";
import DiscussionForum from "./pages/DiscussionForum";
function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <MainLayout />
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { user } = useAuth();
  const { isAdminAuthenticated } = useAdmin();
  const location = useLocation();
  const path = location.pathname;

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleSidebarToggle = () => setSidebarVisible((prev) => !prev);

  const hideAdminNavbar = ["/view-pyq"].includes(path);
  const hideAdminSidebar = ["/view-pyq"].includes(path);
  const hideNavbar = [
    "/auth",
    "/admin",
    "/admin-dashboard",
    "/admin-pyq-upload",
  ].includes(path);
  const hideFooter = [
    "/chatbotpage",
    "/auth",
    "/admin",
    "/admin-dashboard",
    "/admin-pyq-upload",
  ].includes(path);

  const showSidebar =
    (user &&
      [
        "/dashboard",
        "/logged-homepage",
        "/profile",
        "/notifications",
        "/requests-inbox",
        "/create-post",
        "/my-projects",
        "/interview-prep",
        "/view-pyq",
        "/cgpa-calculator",
        "/attendance-calculator",
        "/roadmap",
        "/disc-for",
      ].some((route) => path.startsWith(route))) ||
    path.startsWith("/complete_accept_project/");

  return (
    <>
      {isAdminAuthenticated && !hideAdminNavbar && <AdminNavbar />}
      {!hideNavbar &&
        (user ? (
          <LoggedNavbar onSidebarToggle={handleSidebarToggle} />
        ) : (
          <Navbar />
        ))}

      <div style={{ display: "flex" }}>
        {isAdminAuthenticated && !hideAdminSidebar && <AdminSidebar />}
        {showSidebar && (
          <Sidebar
            isMobileSidebarVisible={sidebarVisible}
            toggleSidebar={handleSidebarToggle}
          />
        )}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile-setup" element={<ProfileDetails />} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin-dashboard"
              element={
                isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin />
              }
            />
            <Route
              path="/admin-pyq-upload"
              element={
                isAdminAuthenticated ? <AdminPYQUpload /> : <AdminLogin />
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap/data-science"
              element={
                <PrivateRoute>
                  <DataScienceRoadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/disc-for"
              element={
                <PrivateRoute>
                  <DiscussionForum />
                </PrivateRoute>
              }
            />

            <Route
              path="/roadmap/devops"
              element={
                <PrivateRoute>
                  <DevOpsCloudRoadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap/blockchain"
              element={
                <PrivateRoute>
                  <BlockchainRoadmap />
                </PrivateRoute>
              }
            />

            <Route
              path="/roadmap/cybersecurity"
              element={
                <PrivateRoute>
                  <CybersecurityRoadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap/mobile"
              element={
                <PrivateRoute>
                  <MobileRoadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap/web"
              element={
                <PrivateRoute>
                  <WebDevelopmentRoadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/logged-homepage"
              element={
                <PrivateRoute>
                  <LoggedHomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <PrivateRoute>
                  <Roadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <PostDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests-inbox"
              element={
                <PrivateRoute>
                  <RequestsInbox />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-projects"
              element={
                <PrivateRoute>
                  <MyProjects />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-member/:email"
              element={
                <PrivateRoute>
                  <TeamMemberInfoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cgpa-calculator"
              element={
                <PrivateRoute>
                  <CgpaCalculator />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance-calculator"
              element={
                <PrivateRoute>
                  <AttendanceCalculator />
                </PrivateRoute>
              }
            />
            <Route
              path="/view-pyq"
              element={
                <PrivateRoute>
                  <ViewPYQPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/interview-prep/:topic"
              element={
                <PrivateRoute>
                  <InterviewPrepPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/complete_accept_project/:id"
              element={
                <PrivateRoute>
                  <CompleteProjectView />
                </PrivateRoute>
              }
            />

            <Route path="/chatbotpage" element={<ChatbotPage />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>
      </div>

      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
