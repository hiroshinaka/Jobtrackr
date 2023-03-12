//----------------------------------------
//  Your web apps Firebase configuration
//----------------------------------------

var firebaseConfig = {
    apiKey: "AIzaSyBtUQTNz2RvuYefF9Jpdi0LKHbrZUHgjVY",
    authDomain: "hackathon2023-dc63f.firebaseapp.com",
    projectId: "hackathon2023-dc63f",
    storageBucket: "hackathon2023-dc63f.appspot.com",
    messagingSenderId: "1018847075313",
    appId: "1:1018847075313:web:498d688666ce252c760250",
    measurementId: "G-05TB37QL7D"
  
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
