import * as React from "react";

// Import du hook perso useFirestore
import { useFirestore } from "../utils/useFirestore";

// Création du Authcontexte
export const UsersContext = React.createContext();

// Création d'un hook useAuth pour optimiser
export const useUsers = () => {
  const context = React.useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers() s'utilise avec <UsersContext.provider>");
  }
  return context;
};

// Création du Provider du contexte
export function UsersContextProvider(props) {
  // Récupération des users via le hook perso
  const users = useFirestore("users");

  return (
    <UsersContext.Provider value={{ users }}>
      {props.children}
    </UsersContext.Provider>
  );
}
