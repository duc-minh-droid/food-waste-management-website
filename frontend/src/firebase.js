// Firebase is only initialised in live mode (see services/config.js).
// The web config is read from REACT_APP_FIREBASE_* environment variables so no
// project keys live in the repository. Copy .env.example to .env.local to use it.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let instance = null;

export function getFirebase() {
  if (!instance) {
    const app = initializeApp(firebaseConfig);
    instance = { app, auth: getAuth(app), db: getFirestore(app) };
  }
  return instance;
}

export const signInWithGoogle = () =>
  signInWithPopup(getFirebase().auth, new GoogleAuthProvider());

export const signOutUser = () => signOut(getFirebase().auth);
