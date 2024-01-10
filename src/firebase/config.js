// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider}from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqoP11MwRqDjqj_oCprp55xSnyix4DaEs",
  authDomain: "twitter-x-clone-3d1d2.firebaseapp.com",
  projectId: "twitter-x-clone-3d1d2",
  storageBucket: "twitter-x-clone-3d1d2.appspot.com",
  messagingSenderId: "658004484841",
  appId: "1:658004484841:web:8e1b3e1d978866b1fb8678",
  measurementId: "G-3W7X6RZWC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =getAuth(app);
export const provider =new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
