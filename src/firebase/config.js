import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAqqR7hwf5oEofzwpos8Wx6GiwCZkC7vx4",
  authDomain: "photo-gallery-firegram.firebaseapp.com",
  projectId: "photo-gallery-firegram",
  storageBucket: "photo-gallery-firegram.appspot.com",
  messagingSenderId: "372070702307",
  appId: "1:372070702307:web:4b23b3e5866b2efda539d6",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

// invoking firestore and storage also
const invokeFirestore = firebase.firestore();
const invokeStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { invokeFirestore, invokeStorage, timestamp };
export default fire;
