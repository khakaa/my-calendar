import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMffSz3sgnOsOPnnDfiCOhIfZ0yiSMZ3U",
  authDomain: "my-calendar-d71e0.firebaseapp.com",
  projectId: "my-calendar-d71e0",
  storageBucket: "my-calendar-d71e0.appspot.com",
  messagingSenderId: "414286657616",
  appId: "1:414286657616:web:723679eaedcce348aaf955",
  measurementId: "G-RJF6ML31Y6",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };
