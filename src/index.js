import React from "react";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { FirebaseAppProvider } from "reactfire";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const firebaseConfig = {
  apiKey: "AIzaSyA6R0O3-",
  projectId: "reactfire1-local",
};
const  app = firebase.initializeApp(firebaseConfig);
app.auth().useEmulator('http://localhost:9099/')
app.firestore().useEmulator('localhost', 8080);

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
