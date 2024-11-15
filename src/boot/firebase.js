// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX2mgHMdSdhxMFjDeQK1EWftKl6_XdORI",
  authDomain: "calidad-agua-37eef.firebaseapp.com",
  databaseURL: "https://calidad-agua-37eef-default-rtdb.firebaseio.com",
  projectId: "calidad-agua-37eef",
  storageBucket: "calidad-agua-37eef.firebasestorage.app",
  messagingSenderId: "242620717996",
  appId: "1:242620717996:web:8f46b53ceec7367af03809"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default async ({  }) => {

}



export { db }
