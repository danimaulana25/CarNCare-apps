// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnqu0TGJxp2IvNnIkQpyexbbpLW6Eq0nQ",
  authDomain: "uas-pbf-7cf57.firebaseapp.com",
  projectId: "uas-pbf-7cf57",
  storageBucket: "uas-pbf-7cf57.appspot.com",
  messagingSenderId: "848215784297",
  appId: "1:848215784297:web:2d922fb3a948d9ce579bf8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
