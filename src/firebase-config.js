// Import de la fonction d'initialisation de Firebase
import { initializeApp } from "firebase/app";

// Import de la fonction pour récupérer l'authentification
import { getAuth } from "firebase/auth";

// Import de la fonction pour récupérer le firestore
import { getFirestore } from "@firebase/firestore";

// Import de la fonction pour récupérer le storage
import { getStorage } from "firebase/storage";

// Configuration de la base de donnée
const firebaseConfig = {
  apiKey: "AIzaSyBTbjYAEsYyAy8M9_-aKibSFdh4B5eb6ic",
  authDomain: "clone-tw.firebaseapp.com",
  projectId: "clone-tw",
  storageBucket: "clone-tw.appspot.com",
  messagingSenderId: "554791574832",
  appId: "1:554791574832:web:fc60754c54cdf72f9b3cf5",
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Création d'une référence à l'authentification
export const auth = getAuth();

// Création d'une référence au firestore
export const database = getFirestore();

// Création d'une référence au service de stockage
export const storage = getStorage(firebaseApp);
