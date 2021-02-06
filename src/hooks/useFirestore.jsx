import { useState, useEffect } from "react";
import { firestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const documents = [];
        snapshot.forEach((document) => {
          documents.push({ id: document.id, ...document.data() });
        });
        setData(documents);
        setIsLoading(false);
      });

    return unsubscribe;
  }, [collection]);

  return { isLoading, data };
};

export default useFirestore;
