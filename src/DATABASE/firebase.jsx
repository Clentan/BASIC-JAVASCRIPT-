// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgfkhuP6jDboSGBfIgnKTaBBESrNAtK-E",
  authDomain: "weli-3c6fd.firebaseapp.com",
  projectId: "weli-3c6fd",
  storageBucket: "weli-3c6fd.appspot.com",
  messagingSenderId: "575316135769",
  appId: "1:575316135769:web:4b698cd7c43ca5d8828648",
  measurementId: "G-BWYH1QGWW1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
