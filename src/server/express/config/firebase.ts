// Import the Firebase SDK and the Firestore library
// import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
var admin = require("firebase-admin");
import { getAuth as getAdminAuth } from "firebase-admin/auth";
// import { getAuth as getFirebaseAuth } from "firebase/auth";

var serviceAccount = process.env.VITE_FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT)
  : require(process.env.PATH_TO_FIREBASE_SERVICE_JSON!);

// Initialize Firebase (replace with your config)
// Firebase Config (From Firebase Console)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app = admin.initializeApp({
  ...firebaseConfig,
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore(app);
const auth = getAdminAuth(app);
// const clientAuth = getFirebaseAuth(app);

export { db, auth };
