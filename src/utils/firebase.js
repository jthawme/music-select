import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA80JhQ7vwkrZv4929xjuaxPSgcWuW9GKQ",
  authDomain: "music-select-6b777.firebaseapp.com",
  databaseURL: "https://music-select-6b777.firebaseio.com",
  projectId: "music-select-6b777",
  storageBucket: "music-select-6b777.appspot.com",
  messagingSenderId: "845871354479",
  appId: "1:845871354479:web:2a1560c2cf61781cd1339a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
