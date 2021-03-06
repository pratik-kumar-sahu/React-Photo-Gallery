import { useState, useEffect } from "react";
import { invokeStorage, invokeFirestore, timestamp } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // storageRef is a reference made in firebase storage using file's name
    const storageRef = invokeStorage.ref(file.name); // for saving images in storage
    const collectionRef = invokeFirestore.collection("images"); // for storing image url

    // now using storageRef, we will monitor and use states (progress, error, url) based on the file is uploaded or not.
    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
