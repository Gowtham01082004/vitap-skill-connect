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
  const [loading, setLoading] = useState(true); // ✅ Manages loading state

  // 🔄 Monitor authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUserName(userDoc.data().name || "User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      setLoading(false); // ✅ Ensure loading state is updated
    });

    return () => unsubscribe();
  }, []);

  // 🚪 Logout function
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
      {!loading && children}{" "}
      {/* ✅ Prevent rendering until loading completes */}
    </AuthContext.Provider>
  );
};

// 🏷 Custom Hook to Access Authentication Data
export const useAuth = () => useContext(AuthContext);
