// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect";
import { connectorConfig } from "@dataconnect/generated";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "brainhaven2.firebaseapp.com",
  projectId: "brainhaven2",
  storageBucket: "brainhaven2.firebasestorage.app",
  messagingSenderId: "603797853502",
  appId: "1:603797853502:web:6490a3c501647afb01086f",
  measurementId: "G-JS2RG85EYN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
getDataConnect(connectorConfig);

export { auth };
