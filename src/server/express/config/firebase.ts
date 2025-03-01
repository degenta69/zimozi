// Import the Firebase SDK and the Firestore library
// import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
var admin = require("firebase-admin");
import { getAuth as getAdminAuth } from "firebase-admin/auth";
// import { getAuth as getFirebaseAuth } from "firebase/auth";

var serviceAccount = require("/Users/dipansh_vivo/personal/zimozi-b21dc-firebase-adminsdk-fbsvc-36feb561b0.json");

// Initialize Firebase (replace with your config)
// Firebase Config (From Firebase Console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app = admin.initializeApp({
  ...firebaseConfig,
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore(app);
const auth = getAdminAuth(app);
// const clientAuth = getFirebaseAuth(app);

export { db, auth };
