import firebase from "firebase";
import Rebase from "re-base";

const config = {
  apiKey: "AIzaSyBF8tvtspyNzoy4Ydu-ASH6KRh-3U0vzAw",
  authDomain: "project-unicam-2fa57.firebaseapp.com",
  databaseURL: "https://project-unicam-2fa57.firebaseio.com",
  projectId: "project-unicam-2fa57",
  storageBucket: "project-unicam-2fa57.appspot.com",
  messagingSenderId: "78676571119"
};

const fire = firebase.initializeApp(config);

const providerGoogle = new firebase.auth.GoogleAuthProvider();

const base = Rebase.createClass(fire.database());

export { fire, providerGoogle, base };