import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-xNMS3x2tL6r4B9nuBQHV5Sn6jvtbqjA",
  authDomain: "newapi-11bd1.firebaseapp.com",
  projectId: "newapi-11bd1",
  storageBucket: "newapi-11bd1.appspot.com",
  messagingSenderId: "508231654422",
  appId: "1:508231654422:web:890ac4f799576928fb2937"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
