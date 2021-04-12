import { useState, useEffect } from "react";
import { invokeFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = invokeFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub(); // we need to return from this function as soon as image grid dismounts (or unsubscribe from this collection as we no longer use it).
  }, [collection]);

  return { docs };
};

export default useFirestore;
