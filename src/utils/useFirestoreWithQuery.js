import { useState, useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { database } from "../firebase-config";

export function useFirestoreWithQuery(ref) {
  const [data, setData] = useState();
  const collectionRef = collection(database, ref);
  // Filtre par date de la collection retournée grâce aux fonctions query et orderBy
  const q = query(collectionRef, orderBy("created_at", "desc"));

  useEffect(() => {
    if (!ref) return;
    onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return data;
}
