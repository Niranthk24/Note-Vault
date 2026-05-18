import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPVtdJMmNsOpXKJAAOvxqJKPKg84ae7oM",
  authDomain: "vaulted-1b377.firebaseapp.com",
  projectId: "vaulted-1b377",
  storageBucket: "vaulted-1b377.firebasestorage.app",
  messagingSenderId: "542160405470",
  appId: "1:542160405470:web:67551addae9e1a3b35534f",
  measurementId: "G-Y17LJ73ZEN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);