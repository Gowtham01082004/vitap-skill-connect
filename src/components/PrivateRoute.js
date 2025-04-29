import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // ✅ Prevents flickering
  return user ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
