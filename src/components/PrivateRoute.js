import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileCompleted(data?.profileCompleted || false);
        }
      }
      setProfileLoading(false);
    };

    if (user) checkProfile();
    else setProfileLoading(false);
  }, [user]);

  if (loading || profileLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/auth" replace />;
  if (!profileCompleted && window.location.pathname !== "/profile-setup")
    return (
      <Navigate
        to="/profile-setup"
        state={{ uid: user.uid, email: user.email }}
        replace
      />
    );

  return children;
};

export default PrivateRoute;
