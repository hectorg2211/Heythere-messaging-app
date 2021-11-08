// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5R8Vf_vvKNJgBK0lrv6kXEco0Jwzo8e8",
  authDomain: "heythere-cd330.firebaseapp.com",
  projectId: "heythere-cd330",
  storageBucket: "heythere-cd330.appspot.com",
  messagingSenderId: "621722714050",
  appId: "1:621722714050:web:c90719f641ae19f61c205b",
  measurementId: "G-JH95LXCRRY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Access Firestore instance
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

// Authentication
// Hosting
