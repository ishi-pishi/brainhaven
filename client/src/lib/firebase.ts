// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import {
  getDataConnect,
} from "firebase/data-connect";
import { getFunctions, httpsCallable } from "firebase/functions";
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
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});
const functions = getFunctions(app);
if (import.meta.env.DEV) {
  import('firebase/functions').then(({ connectFunctionsEmulator }) => {
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  });
}
getDataConnect(connectorConfig);

const getStudyTipsCallable = httpsCallable(functions, 'getStudyTipsFn');

async function callMyStudyTipsFunction(sessions: any[] = []) {
    try {
        const result = await getStudyTipsCallable({ sessions });
        const tips = result;
        console.log("Success! Here are your tips:", tips);
        return tips;
    } catch (error) {
        console.error("OH NO! Error calling the function:", error);
        return null;
    }
}

export { auth, functions, callMyStudyTipsFunction };