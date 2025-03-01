// Import the Firebase SDK and the Firestore library
// import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
var admin = require("firebase-admin");
import { getAuth as getAdminAuth } from "firebase-admin/auth";
// import { getAuth as getFirebaseAuth } from "firebase/auth";

var serviceAccount = require("/Users/dipansh_vivo/personal/zimozi-b21dc-firebase-adminsdk-fbsvc-36feb561b0.json");

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyD9ezj8ZtdLWanSZZSoaYuAr3d9gYgutYQ",
  authDomain: "zimozi-b21dc.firebaseapp.com",
  projectId: "zimozi-b21dc",
  storageBucket: "zimozi-b21dc.firebasestorage.app",
  messagingSenderId: "299076990230",
  appId: "1:299076990230:web:7d7f3a181ee05f97dfcc37",
  measurementId: "G-EP34HT2P63",
};

let app = admin.initializeApp({
  ...firebaseConfig,
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore(app);
const auth = getAdminAuth(app);
// const clientAuth = getFirebaseAuth(app);

export { db, auth };
