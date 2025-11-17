
import "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3BbVuLABEt683E3UeNK4Eio7LIHDOZug",
    authDomain: "karencare-a2c2a.firebaseapp.com",
    projectId: "karencare-a2c2a",
    storageBucket: "karencare-a2c2a.firebasestorage.app",
    messagingSenderId: "1041799323386",
    appId: "1:1041799323386:web:5183eab2fe9600a4cfb343",
    measurementId: "G-QW9VQ24LTH"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);