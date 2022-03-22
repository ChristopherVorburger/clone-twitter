import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../firebase-config";

export function useFirestore(ref) {
  const [data, setData] = useState();
  const collectionRef = collection(database, ref);

  useEffect(() => {
    if (!ref) return;

    onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return data;
}
