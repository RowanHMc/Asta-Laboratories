// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDautn0HlwuCgkHzJPMWDHVyAv_jmdLd3A",
  authDomain: "my-weather-app-61500.firebaseapp.com",
  projectId: "my-weather-app-61500",
  storageBucket: "my-weather-app-61500.firebasestorage.app",
  messagingSenderId: "620245055762",
  appId: "1:620245055762:web:b797f3f8fb66306636dbcb",
  measurementId: "G-C9DNNGJ2KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;