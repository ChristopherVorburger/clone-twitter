import * as React from "react";

// Import du hook perso useFirestore
import { useFirestore } from "../utils/useFirestore";

// Création du Authcontexte
export const ListsContext = React.createContext();

// Création d'un hook useAuth pour optimiser
export const useLists = () => {
  const context = React.useContext(ListsContext);
  if (!context) {
    throw new Error("useLists() s'utilise avec <ListsContext.provider>");
  }
  return context;
};

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
