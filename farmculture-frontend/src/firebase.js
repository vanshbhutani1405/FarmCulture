// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🧩 Your Firebase configuration for FarmCulture
// (You can later move these to a .env file for security)
const firebaseConfig = {
  apiKey: "AIzaSyCkEsErUKfxpKb5VhAsjU3Z6jjODTgp1XQ",         
  authDomain: "farmculture-project.firebaseapp.com",
  projectId: "farm-culture-739b9",
  storageBucket: "farmculture-project.appspot.com",
  messagingSenderId: "1010764566119",
  appId: "1:1010764566119:web:7fa0d84488f2801ae5cec2",
  measurementId: "G-KK9M6E5WRC"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Initialize Authentication
export const auth = getAuth(app);

// 💾 Initialize Firestore Database
export const db = getFirestore(app);

export default app;

