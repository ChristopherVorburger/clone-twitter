import { createContext } from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [authUser, setAuthUser] = useState();

  return <AuthContext.Provider value={{ signUp, signIn, authUser }}>{props.children}</AuthContext.Provider>;
}
