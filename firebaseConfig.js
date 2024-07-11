import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAxAuJpgLhkCm3nHBV5keddw1A9auWaedc",
    authDomain: "heladeria-5dba7.firebaseapp.com",
    projectId: "heladeria-5dba7",
    storageBucket: "heladeria-5dba7.appspot.com",
    messagingSenderId: "6982472398",
    appId: "1:6982472398:web:1b74c6aac1dfc61001b69f",
    measurementId: "G-9XVV4RCBZ2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.db = db;