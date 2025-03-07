import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// 🔹 Create Authentication Context
const AuthContext = createContext();

// 🚀 Authentication Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Monitor authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser);

      if (currentUser) {
        setUser(currentUser);

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUserName(userDoc.data().name || "User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserName("");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserName("");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userName, loading, logout }}>
      {loading ? <p>Loading authentication...</p> : children}
    </AuthContext.Provider>
  );
};

// 🏷 Custom Hook to Access Authentication Data
export const useAuth = () => useContext(AuthContext);
