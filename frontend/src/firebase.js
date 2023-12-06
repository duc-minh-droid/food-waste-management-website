// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDubxUPKlZRy0CnV3GNEA2a4h3WgiLPFkM",
  authDomain: "food-waste-web.firebaseapp.com",
  projectId: "food-waste-web",
  storageBucket: "food-waste-web.appspot.com",
  messagingSenderId: "360772662220",
  appId: "1:360772662220:web:1473871a892d00a91a2369"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provide = new GoogleAuthProvider()
const signInWithGoogle = () => {
  signInWithPopup(auth, provide)
    .then(result=>{
        const user = result.user
        console.log(user)
    })
}