import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ChatbotPage from "./pages/ChatbotPage";

import Navbar from "./components/Navbar";
import LoggedNavbar from "./components/LoggedNavbar";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Sidebar from "./components/Sidebar";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
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
import Dashboard from "./pages/Dashboard";
import ProfileDetails from "./pages/ProfileDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // ✅ Hide navbar only for Auth page
  const hideNavbar = ["/auth"].includes(location.pathname);

  // ✅ Hide footer on chatbot full-screen view
  const hideFooter = ["/chatbotpage", "/auth"].includes(location.pathname);

  // ✅ Show sidebar for authenticated routes including /create-post
  const showSidebar =
    user &&
    [
      "/dashboard",
      "/logged-homepage",
      "/profile",
      "/notifications",
      "/requests-inbox",
      "/create-post",
    ].includes(location.pathname);

  return (
    <>
      {/* ✅ Show correct navbar depending on auth state */}
      {!hideNavbar && (user ? <LoggedNavbar /> : <Navbar />)}

      <div style={{ display: "flex" }}>
        {showSidebar && <Sidebar />}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile-setup" element={<ProfileDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
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
            <Route path="/chatbotpage" element={<ChatbotPage />} />

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
        </div>
      </div>

      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
