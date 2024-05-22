// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAOE8KecCoLn6JCgtqGIGuDByPK4KH1A0",
  authDomain: "frontend-final-6dd03.firebaseapp.com",
  projectId: "frontend-final-6dd03",
  storageBucket: "frontend-final-6dd03.appspot.com",
  messagingSenderId: "550494029216",
  appId: "1:550494029216:web:e71724a907ca55729610c5",
  measurementId: "G-05SYVQ855M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);