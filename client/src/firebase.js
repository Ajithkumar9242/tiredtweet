// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC_9UMl_78KMVhg4cjTKqjEqzVLnCVEME",
  authDomain: "next-oauth-f1dc5.firebaseapp.com",
  projectId: "next-oauth-f1dc5",
  storageBucket: "next-oauth-f1dc5.appspot.com",
  messagingSenderId: "915481364179",
  appId: "1:915481364179:web:41a3da06a8a124e3d6b626",
  measurementId: "G-D8WK8Q3CCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app