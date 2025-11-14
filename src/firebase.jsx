// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // const db = getFirestore(app);
// // const auth = getAuth(app);

// // export { app, analytics, db, auth };

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // src/firebase.js
// // import { initializeApp } from "firebase/app";
// // import { getFirestore } from "firebase/firestore";

// // const db = getFirestore(app);

// const firebaseConfig = {
//     apiKey: "AIzaSyDwvBv1IYDMqFWgGtQvdwWerzWOIt89QuU",
//     authDomain: "first-test-4c433.firebaseapp.com",
//     projectId: "first-test-4c433",
//     storageBucket: "first-test-4c433.firebasestorage.app",
//     messagingSenderId: "391716408289",
//     appId: "1:391716408289:web:4aaaa7bd2f6557486a60a0",
//     measurementId: "G-CSNS7EPFXX"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export const db = getFirestore(app);


// export { app, auth };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwvBv1IYDMqFWgGtQvdwWerzWOIt89QuU",
  authDomain: "first-test-4c433.firebaseapp.com",
  projectId: "first-test-4c433",
  storageBucket: "first-test-4c433.firebasestorage.app",
  messagingSenderId: "391716408289",
  appId: "1:391716408289:web:aee6c121f9c856196a60a0",
  measurementId: "G-3NJQ5MNMZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);