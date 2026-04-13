// Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBepWjS4Pwc4y7ZG9ATksL2lA91jjRuxXw",
  authDomain: "prowebsite-bb557.firebaseapp.com",
  projectId: "prowebsite-bb557",
  storageBucket: "prowebsite-bb557.firebasestorage.app",
  messagingSenderId: "403227309165",
  appId: "1:403227309165:web:f7a7c080f6bfe9eab6bb64",
  measurementId: "G-5J2WTV0DXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export instances for use throughout the app
export { app, analytics, db };