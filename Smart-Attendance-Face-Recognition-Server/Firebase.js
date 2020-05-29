/** @format */

const firebase = require("firebase");
const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const Firebase = firebase.initializeApp(firebaseConfig);
module.exports = Firebase;
