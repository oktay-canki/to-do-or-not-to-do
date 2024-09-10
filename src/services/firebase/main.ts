import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reacttodo-abb81.firebaseapp.com",
  projectId: "reacttodo-abb81",
  storageBucket: "reacttodo-abb81.appspot.com",
  messagingSenderId: "413211985289",
  appId: "1:413211985289:web:b575a535cca4e17a87cd58",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
