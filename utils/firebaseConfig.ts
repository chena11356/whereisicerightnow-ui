import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAr6vkUSl02WF0Rttg9Bx1_7y25O78raw8",
  authDomain: "whereisicerightnow2025.firebaseapp.com",
  projectId: "whereisicerightnow2025",
  storageBucket: "whereisicerightnow2025.firebasestorage.app",
  messagingSenderId: "402966237582",
  appId: "1:402966237582:web:27e56823e0ebf095ad14df",
  measurementId: "G-MX1K04FE6M",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
