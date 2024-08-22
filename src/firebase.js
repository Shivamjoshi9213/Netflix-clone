import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBmVfUmBQy7GokOw5Exe45JNb-vN770ozk",
  authDomain: "netflix-clone-ab038.firebaseapp.com",
  projectId: "netflix-clone-ab038",
  storageBucket: "netflix-clone-ab038.appspot.com",
  messagingSenderId: "1027539568761",
  appId: "1:1027539568761:web:d69e6b8c0b2badeeafaca8",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    // create a user in firebase
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // store the user in the firestore database
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Sign up Successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    signOut(auth);
    toast.success("Logout Successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

export { auth, db, login, signup, logout };
