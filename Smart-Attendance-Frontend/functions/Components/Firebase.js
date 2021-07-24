const firebase = require("firebase");
const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const Firebase = firebase.initializeApp(firebaseConfig);
module.exports = Firebase;
