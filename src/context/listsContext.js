import { createContext } from "react";

// Import du hook perso useFirestore
import { useFirestore } from "../utils/useFirestore";

// Création du Authcontexte
export const ListsContext = createContext();

// Création du Provider du contexte
export function ListsContextProvider(props) {
  // Récupération des listes via le hook perso
  const lists = useFirestore("lists");

  return (
    <ListsContext.Provider value={{ lists }}>
      {props.children}
    </ListsContext.Provider>
  );
}
