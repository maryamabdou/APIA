// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDoQyQmb3KxiZRzVtKEMdAlwO2mw5ihEIo",
  authDomain: "apia-72347.firebaseapp.com",
  databaseURL: "https://apia-72347-default-rtdb.firebaseio.com",
  projectId: "apia-72347",
  storageBucket: "apia-72347.appspot.com",
  messagingSenderId: "677798393276",
  appId: "1:677798393276:web:e62b64e695a9764f6e27b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export {storage, database};
