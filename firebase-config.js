import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAm7viCssewXhk4XDPL0RGDUmXjkgrLP3Y",
  authDomain: "cepoint-e27bf.firebaseapp.com",
  projectId: "cepoint-e27bf",
  storageBucket: "cepoint-e27bf.appspot.com",
  messagingSenderId: "872968881565",
  appId: "1:872968881565:web:498265f8437dec7fb95b74"
};

//const app = initializeApp(firebaseConfig)
//export const auth= getAuth(app)
//export const provider = new GoogleAuthProvider();
//export const db = getFirestore()

export const app = initializeApp(firebaseConfig);