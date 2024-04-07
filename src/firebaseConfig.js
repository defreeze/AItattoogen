// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import for Firebase Authentication

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0X83dY3qcwajfmON50Rbl5kiqxoz64x4",
    authDomain: "aitattoogen.firebaseapp.com",
    databaseURL: "https://aitattoogen-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aitattoogen",
    storageBucket: "aitattoogen.appspot.com",
    messagingSenderId: "664405830740",
    appId: "1:664405830740:web:3fd7bcc7f1f924492d91c1",
    measurementId: "G-J0SG78M44N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth, app, analytics };

