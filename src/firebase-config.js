import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4F7kRTlR8xkAp09PtdUhZma85F3dnuZ0",
  authDomain: "blog-app-6ea90.firebaseapp.com",
  projectId: "blog-app-6ea90",
  storageBucket: "blog-app-6ea90.appspot.com",
  messagingSenderId: "749832650646",
  appId: "1:749832650646:web:fda57d4a8573feef42e7b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export const db = getFirestore(app);
export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider()