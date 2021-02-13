import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAi1ixfdiRNqzOpgcPo3K9dc0BvvJe3cPE",
  authDomain: "myfacultydays.firebaseapp.com",
  projectId: "myfacultydays",
  storageBucket: "myfacultydays.appspot.com",
  messagingSenderId: "1035848280229",
  appId: "1:1035848280229:web:b9a8d8a6c2aefa7628054c"
});

export default firebase;
