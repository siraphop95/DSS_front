import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// firebase init goes here
var firebaseConfig = {
  apiKey: "AIzaSyAkrcPll8JKucgwl-93Odi1w1CojjxZSwo",
  authDomain: "drug-suggestion-service.firebaseapp.com",
  databaseURL: "https://drug-suggestion-service.firebaseio.com",
  projectId: "drug-suggestion-service",
  storageBucket: "drug-suggestion-service.appspot.com",
  messagingSenderId: "203464801864",
  appId: "1:203464801864:web:2882b7eefb1e2301"
};

firebase.initializeApp(firebaseConfig)
console.log("firebase initializaed in ./scr/firebaseConfig.js")

// const firestorage = firebase.storage()
const auth = firebase.auth()
// export {
//   // firestorage,
//   auth
// }