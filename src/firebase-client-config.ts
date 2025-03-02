import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Config (From Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD9ezj8ZtdLWanSZZSoaYuAr3d9gYgutYQ",
  authDomain: "zimozi-b21dc.firebaseapp.com",
  projectId: "zimozi-b21dc",
  storageBucket: "zimozi-b21dc.firebasestorage.app",
  messagingSenderId: "299076990230",
  appId: "1:299076990230:web:7d7f3a181ee05f97dfcc37",
  measurementId: "G-EP34HT2P63",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
