// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-sahand.firebaseapp.com",
  projectId: "mern-estate-sahand",
  storageBucket: "mern-estate-sahand.appspot.com",
  messagingSenderId: "807822101775",
  appId: "1:807822101775:web:4f3341b646366414ae827a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);