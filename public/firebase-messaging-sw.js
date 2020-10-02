importScripts("https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.21.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAyUxFOQYayzbx2AtGK-AeJRDOwTBMA6fQ",
  authDomain: "gp2-development.firebaseapp.com",
  databaseURL: "https://gp2-development.firebaseio.com",
  projectId: "gp2-development",
  storageBucket: "gp2-development.appspot.com",
  messagingSenderId: "262549370547",
  appId: "1:262549370547:web:c5395b47c4346536c5a2c6",
  measurementId: "G-T349G1RFJZ",
});

const messaging = firebase.messaging();