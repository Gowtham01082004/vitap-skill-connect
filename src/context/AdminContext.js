import { createContext, useContext, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // ✅ make sure you export auth

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const loginAdmin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Check if it's the real admin email
      if (user.email === "admin@vitassist.com") {
        setIsAdminAuthenticated(true);
        return true;
      } else {
        alert("Not authorized as admin");
        await signOut(auth); // sign out if it's a non-admin user
        return false;
      }
    } catch (err) {
      console.error("Admin login failed:", err);
      return false;
    }
  };

  const logoutAdmin = async () => {
    await signOut(auth);
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminContext.Provider
      value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
