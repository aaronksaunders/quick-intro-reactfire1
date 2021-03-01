import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseAppProvider } from "reactfire";

// redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './features/userAuth/userAuthSlice';

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});


const firebaseConfig = {
  apiKey: "AIzaSyA6R0O3-",
  projectId: "reactfire1-local",
};
firebase.initializeApp(firebaseConfig);
// app.auth().useEmulator("http://localhost:9099/");
// app.firestore().useEmulator("localhost", 8080);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
