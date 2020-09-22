const firebase = require("firebase");
const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyBfa8Ubkvzu1m3UdMb7fDGdRD6Xi68TmnU",
  authDomain: "geeksfortech-286913.firebaseapp.com",
  databaseURL: "https://geeksfortech-286913.firebaseio.com",
  projectId: "geeksfortech-286913",
  storageBucket: "geeksfortech-286913.appspot.com",
  messagingSenderId: "204543828368",
  appId: "1:204543828368:web:d2147630c21d41a95cd315",
};

const Firebase = firebase.initializeApp(firebaseConfig);
module.exports = Firebase;
