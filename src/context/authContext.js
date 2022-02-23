import { createContext, useEffect } from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);
  const signUserOut = () => signOut(auth);

  const [authUser, setAuthUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      setLoadingData(false);
      // TODO: log à supprimer avant la prod
      console.log("currentUser", currentUser);

      return unsubscribe;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, authUser, signUserOut }}>
      {!loadingData && props.children}
    </AuthContext.Provider>
  );
}
