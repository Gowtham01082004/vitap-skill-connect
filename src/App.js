import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import chatbotIcon from "./assets/images/chatbot-icon.png";

import Navbar from "./components/Navbar";
import LoggedNavbar from "./components/LoggedNavbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./pages/FAQ";
import AuthPage from "./pages/AuthPage";
import LoggedHomePage from "./pages/LoggedHomePage";
import ProfilePage from "./pages/ProfilePage";
import PostDetails from "./pages/PostDetails";
import RequestsInbox from "./pages/RequestsInbox";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Chatbot from "./components/Chatbot";
import ProfileDetails from "./pages/ProfileDetails"; // ✅ Import ProfileDetails

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

// ✅ Handles Navbar & Routes Properly
const MainLayout = () => {
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  const hideNavbar = location.pathname === "/auth"; // ✅ Hide Navbar on AuthPage

  return (
    <>
      {!hideNavbar && (user ? <LoggedNavbar /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* ✅ New Route for Profile Setup */}
        <Route path="/profile-setup" element={<ProfileDetails />} />

        <Route
          path="/logged-homepage"
          element={
            <PrivateRoute>
              <LoggedHomePage />
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
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      {!user && !hideNavbar && <Footer />}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            src={chatbotIcon}
            alt="Chatbot Icon"
            style={{ width: "50px", height: "50px" }}
          />
        </button>
        {chatOpen && (
          <div
            style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              background: "white",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Chatbot />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
