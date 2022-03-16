import { createContext } from "react";

// Import du hook perso useFirestore
import { useFirestore } from "../utils/useFirestore";

// Création du Authcontexte
export const UsersContext = createContext();

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
