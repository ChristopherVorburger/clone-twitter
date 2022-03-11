import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { database } from "../firebase-config";

// Fonction qui trie les données des collections avec les méthodes query et where
export function useFirestoreWithQueryAndWhere(ref, fieldName, searchParam) {
  const [data, setData] = useState();
  const collectionRef = collection(database, ref);
  // Filtre par date de la collection retournée grâce aux fonctions query et orderBy
  const q = query(
    collectionRef,
    // Tri des données avec la méthode "where"
    where(`${fieldName}`, "==", `${searchParam}`),
    orderBy("created_at", "desc")
  );

  useEffect(() => {
    if (!ref) return;
    onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [ref]);

  return data;
}