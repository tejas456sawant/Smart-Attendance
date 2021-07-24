import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.appId,
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
