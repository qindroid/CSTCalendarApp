//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Specifies which firebase project your application is connected with.
//---------------------------------------------------------------------

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCEW_XfFO4Pxta8xDhMKhD-0f11TGvUzxo",
  authDomain: "projectcst-4cf74.firebaseapp.com",
  databaseURL: "https://projectcst-4cf74.firebaseio.com",
  projectId: "projectcst-4cf74",
  storageBucket: "projectcst-4cf74.appspot.com",
  messagingSenderId: "630036074523",
  appId: "1:630036074523:web:2706463e85eeb37c6928be"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 
// Create the Firestore database object
// Henceforce, any reference to the database can be made with "db"
const db = firebase.firestore();