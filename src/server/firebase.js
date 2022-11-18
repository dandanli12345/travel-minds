import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCgS_WOH-lpcqHc4iqGml_B7Mtu547XrH0",
  authDomain: "travel-minds-39777.firebaseapp.com",
  projectId: "travel-minds-39777",
  storageBucket: "travel-minds-39777.appspot.com",
  messagingSenderId: "479551603927",
  appId: "1:479551603927:web:c46bb34f62bbdbe8645c92",
  measurementId: "G-H4TYKFYR67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()