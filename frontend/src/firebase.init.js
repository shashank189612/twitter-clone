import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPXymcRnMJ6G6l-XqZ-oWfIbXGRlD1nuk",
  authDomain: "auth-e6790.firebaseapp.com",
  projectId: "auth-e6790",
  storageBucket: "auth-e6790.appspot.com",
  messagingSenderId: "120787023783",
  appId: "1:120787023783:web:04dc028735897ed915a882",
  measurementId: "G-KQS9Y63WTJ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;
