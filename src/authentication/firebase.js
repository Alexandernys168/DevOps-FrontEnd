// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtbNEguSFo84dQG4w0lGe-zbdUo_a7wWY",
    authDomain: "devops-d85df.firebaseapp.com",
    projectId: "devops-d85df",
    storageBucket: "devops-d85df.appspot.com",
    messagingSenderId: "242392384836",
    appId: "1:242392384836:web:28c30980d5a7c12efc0311",
    measurementId: "G-6G6FMVYFBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;