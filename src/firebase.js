// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {getStorage} from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRWCH_Eu8ZrNaKoIuPjR6pcn7vmDj_5c0",
  authDomain: "olx-clone-85430.firebaseapp.com",
  projectId: "olx-clone-85430",
  storageBucket: "olx-clone-85430.firebasestorage.app",
  messagingSenderId: "226356607000",
  appId: "1:226356607000:web:bc5b949e32ea2fe64b6b6d",
  measurementId: "G-5N23JELC80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
// export const storage=getStorage(app);
// const analytics = getAnalytics(app);