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
import LoggedNavbar from "./components/LoggedNavbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";

import InterviewPrepPage from "./pages/InterviewPrepPage";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./pages/FAQ";
import AuthPage from "./pages/AuthPage";
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
import AdminDashboard from "./pages/AdminDashboard";

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

  // Admin UI visibility
  const hideAdminNavbar = ["/view-pyq"].includes(path);
  const hideAdminSidebar = ["/view-pyq"].includes(path);

  // General UI visibility
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
    user &&
    (path.startsWith("/dashboard") ||
      path.startsWith("/logged-homepage") ||
      path.startsWith("/profile") ||
      path.startsWith("/notifications") ||
      path.startsWith("/requests-inbox") ||
      path.startsWith("/create-post") ||
      path.startsWith("/my-projects") ||
      path.startsWith("/interview-prep") ||
      path.startsWith("/view-pyq") ||
      path.startsWith("/cgpa-calculator"));

  return (
    <>
      {/* Admin Top Navbar */}
      {isAdminAuthenticated && !hideAdminNavbar && <AdminNavbar />}

      {/* Regular Navbars */}
      {!hideNavbar && (user ? <LoggedNavbar /> : <Navbar />)}

      <div style={{ display: "flex" }}>
        {/* Admin Sidebar */}
        {isAdminAuthenticated && !hideAdminSidebar && <AdminSidebar />}

        {/* Student Sidebar */}
        {showSidebar && <Sidebar />}

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Admin Routes */}
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

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile-setup" element={<ProfileDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Private User Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
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
              path="/cgpa-calculator"
              element={
                <PrivateRoute>
                  <CgpaCalculator />
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

            {/* Chatbot */}
            <Route path="/chatbotpage" element={<ChatbotPage />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
