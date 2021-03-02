import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdInoUR74PiWVX1G2cx_tdOYKhem1NmnM",
  authDomain: "dishhobby-a26cb.firebaseapp.com",
  databaseURL: "https://dishhobby-a26cb.firebaseio.com",
  projectId: "dishhobby-a26cb",
  storageBucket: "dishhobby-a26cb.appspot.com",
  messagingSenderId: "268773744266",
  appId: "1:268773744266:web:85194c1d85299ed9d1d773",
  measurementId: "G-SKLC0HWXHD",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var database = firebase.database();

export { database, auth };
