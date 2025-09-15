import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7DnpFs3D9PynrBFtm0quZfRwTzlmol60",
  authDomain: "ecotip-38fc8.firebaseapp.com",
  projectId: "ecotip-38fc8",
  storageBucket: "ecotip-38fc8.firebasestorage.app",// <-- FIXED HERE
  messagingSenderId: "462096655391",
  appId: "1:462096655391:web:88a03d26be318af0fb212a",
  measurementId: "G-4PY8T490QX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);