import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyAyUxFOQYayzbx2AtGK-AeJRDOwTBMA6fQ",
  authDomain: "gp2-development.firebaseapp.com",
  databaseURL: "https://gp2-development.firebaseio.com",
  projectId: "gp2-development",
  storageBucket: "gp2-development.appspot.com",
  messagingSenderId: "262549370547",
  appId: "1:262549370547:web:c5395b47c4346536c5a2c6",
  measurementId: "G-T349G1RFJZ",
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf
        fallback={"loading application..."}
        traceId={"load-burrito-status"}
      >
        <App />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
