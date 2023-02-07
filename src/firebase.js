import { initializeApp } from "firebase/app";
import { getAuth,} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrbs9JTiiCvaRN5EHmb6tbV3YiQoPYPx0",
  authDomain: "gogletest-1e5f0.firebaseapp.com",
  projectId: "gogletest-1e5f0",
  storageBucket: "gogletest-1e5f0.appspot.com",
  messagingSenderId: "897439102343",
  appId: "1:897439102343:web:3dcbda622a4005535f4f22"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

