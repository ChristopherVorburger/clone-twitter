import * as React from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// Import de la fonction getAuth() de firebase
import { auth } from "../firebase-config";

// Import du hook perso useFirestore
import { useFirestore } from "../utils/useFirestore";

// Création du Authcontexte
export const AuthContext = React.createContext();

// Création d'un hook useAuth pour optimiser
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() s'utilise avec <AuthContext.provider>");
  }
  return context;
};

// Création du Provider du contexte
export function AuthContextProvider(props) {
  // Récupération des users via le hook perso
  const users = useFirestore("users");
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);
  const signUserOut = () => signOut(auth);

  const [authUser, setAuthUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  // Recherche de l'id du user qui match avec celui du user connecté
  // afin de récupérer les datas de l'utilisateur connecté
  const userData = users?.filter((user) => user?.id === authUser?.uid);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      setLoadingData(false);
      return unsubscribe;
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ signUp, signIn, authUser, signUserOut, userData }}
    >
      {!loadingData && props.children}
    </AuthContext.Provider>
  );
}
