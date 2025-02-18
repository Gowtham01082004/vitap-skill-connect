import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYj6EZPaN0SC0cVcitjb_p2_W4q_AWrW8",
  authDomain: "skill-connect-7e41e.firebaseapp.com",
  projectId: "skill-connect-7e41e",
  storageBucket: "skill-connect-7e41e.firebasestorage.app",
  messagingSenderId: "526249996469",
  appId: "1:526249996469:web:f993f02f99e33d90f30efc",
  measurementId: "G-NTPE5FW79M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance
