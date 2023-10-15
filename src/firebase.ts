// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWrHXUlI0q1caqjG6W9_38jRCKDyIRZU8",
  authDomain: "nwitter-clone-challenge.firebaseapp.com",
  projectId: "nwitter-clone-challenge",
  storageBucket: "nwitter-clone-challenge.appspot.com",
  messagingSenderId: "155759097044",
  appId: "1:155759097044:web:554de121b08565bedc3741",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
