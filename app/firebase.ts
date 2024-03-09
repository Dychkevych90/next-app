// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKfmI3ENbguRVbuoHMt6NhA7olnad1lek",
  authDomain: "pet-nextjs.firebaseapp.com",
  projectId: "pet-nextjs",
  storageBucket: "pet-nextjs.appspot.com",
  messagingSenderId: "704380351938",
  appId: "1:704380351938:web:af564758fda5d7519f925b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;