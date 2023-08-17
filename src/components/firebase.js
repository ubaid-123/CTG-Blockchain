import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB1qRod6zUTEBu40nq6rnAKrvPTwF7mfrY",
  authDomain: "my-token-maker.firebaseapp.com",
  databaseURL: "https://my-token-maker-default-rtdb.firebaseio.com",
  projectId: "my-token-maker",
  storageBucket: "my-token-maker.appspot.com",
  messagingSenderId: "400576968017",
  appId: "1:400576968017:web:1a184ed4f4e77c06f88f70"


  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();