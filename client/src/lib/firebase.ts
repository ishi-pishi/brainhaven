// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkAMDZSC8p0FbxcIjR2tRF-acpelZiEJY",
  authDomain: "brainhaven.firebaseapp.com",
  projectId: "brainhaven",
  storageBucket: "brainhaven.firebasestorage.app",
  messagingSenderId: "582041622284",
  appId: "1:582041622284:web:1ca675ecb230cfcc1b5b29",
  measurementId: "G-WZ0P1G7DL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataConnect = getDataConnect(connectorConfig);

connectAuthEmulator(auth, "http://localhost:9099");
connectDataConnectEmulator(dataConnect, "localhost", 8080);

export { auth }