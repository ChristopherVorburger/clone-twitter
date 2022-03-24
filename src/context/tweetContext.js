import * as React from "react";

// Import du hook perso useFirestore
import { useFirestore } from "../utils/useFirestore";
import { useFirestoreWithQuery } from "../utils/useFirestoreWithQuery";

// Création du Authcontexte
export const TweetsContext = React.createContext();

// Création d'un hook useAuth pour optimiser
export const useTweets = () => {
  const context = React.useContext(TweetsContext);
  if (!context) {
    throw new Error("useTweets() s'utilise avec <TweetsContext.provider>");
  }
  return context;
};

// Création du Provider du contexte
export function TweetsContextProvider(props) {
  // Récupération des tweets via le hook perso
  const tweets = useFirestore("tweets");

  // Récupération des tweets triés par date via le hook perso
  const tweetsByDate = useFirestoreWithQuery("tweets");

  return (
    <TweetsContext.Provider value={{ tweets, tweetsByDate }}>
      {props.children}
    </TweetsContext.Provider>
  );
}
