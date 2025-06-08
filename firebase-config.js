// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDVcCFUMIzzjAK2-rRGcKATYF_4wcpcBmU",
    authDomain: "electivefinals.firebaseapp.com",
    databaseURL: "https://electivefinals-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "electivefinals",
    storageBucket: "electivefinals.firebasestorage.app",
    messagingSenderId: "475170564751",
    appId: "1:475170564751:web:0821af9d8bb03a679adefa",
    measurementId: "G-GN6BBYRBDP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);