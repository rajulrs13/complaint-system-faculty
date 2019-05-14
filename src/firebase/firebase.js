import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAtw8XjYvNvwFUo_Hp2m8DAhg7R0l6qzFc",
  authDomain: "muj-complaint-portal.firebaseapp.com",
  databaseURL: "https://muj-complaint-portal.firebaseio.com",
  projectId: "muj-complaint-portal",
  storageBucket: "muj-complaint-portal.appspot.com",
  messagingSenderId: "875793367693",
  appId: "1:875793367693:web:254caf851500fd5e"
});

export default firebase;
