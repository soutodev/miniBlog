// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGRz6uE_nfmrPJoDMScbfwJqEObknKWyQ",
  authDomain: "miniblog-788d7.firebaseapp.com",
  projectId: "miniblog-788d7",
  storageBucket: "miniblog-788d7.appspot.com",
  messagingSenderId: "130888388136",
  appId: "1:130888388136:web:fea0c26f5561088481af1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {  db  };