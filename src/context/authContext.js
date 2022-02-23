import { createContext, useEffect } from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const signUp = (email, phone, pwd) =>
    createUserWithEmailAndPassword(auth, email, phone, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [authUser, setAuthUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      setLoadingData(false);

      return unsubscribe;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, authUser }}>
      {!loadingData && props.children}
    </AuthContext.Provider>
  );
}
