// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo0ZbSyQvkAKVTuTXUbW2dYBZzZ5aV_5U",
  authDomain: "brainhaven2.firebaseapp.com",
  projectId: "brainhaven2",
  storageBucket: "brainhaven2.firebasestorage.app",
  messagingSenderId: "603797853502",
  appId: "1:603797853502:web:6490a3c501647afb01086f",
  measurementId: "G-JS2RG85EYN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataConnect = getDataConnect(connectorConfig);

connectAuthEmulator(auth, "http://localhost:9099");
connectDataConnectEmulator(dataConnect, "localhost", 8081);

export { auth }