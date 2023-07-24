// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage }  from "firebase/storage";
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwfMSHV1WKRXi6889d0JnC6a_8Za2sOlA",
  authDomain: "podcast-app-react-189b9.firebaseapp.com",
  projectId: "podcast-app-react-189b9",
  storageBucket: "podcast-app-react-189b9.appspot.com",
  messagingSenderId: "1012454304118",
  appId: "1:1012454304118:web:f894ac8febefe3c3873257",
  measurementId: "G-E7G7LETFF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };


//const analytics = getAnalytics(app);