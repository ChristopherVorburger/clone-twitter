import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export function useFirestore(ref) {
  const database = getFirestore();
  const [data, setData] = useState();
  const collectionRef = collection(database, ref);

  useEffect(() => {
    if (!ref) return;

    onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [ref]);

  return data;
}
