// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKBQV74ABLi4SXYRRh2wLkoKRef-drJB0",
  authDomain: "my-app-ba0fe.firebaseapp.com",
  projectId: "my-app-ba0fe",
  storageBucket: "my-app-ba0fe.firebasestorage.app",
  messagingSenderId: "832229278672",
  appId: "1:832229278672:web:8f0446ceb4b24980196fd5",
  measurementId: "G-CD6G50P27Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);