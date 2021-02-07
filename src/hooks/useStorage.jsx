import { useState, useEffect } from "react";
import { storage, firestore, timestamp } from "../firebase/config";

const useStorage = (post) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Saves the new post to firestore
    const savePost = async ({ uid, firstName, lastName, text, media }) => {
      try {
        await firestore.collection("posts").add({
          userId: uid,
          firstName,
          lastName,
          text,
          media,
          likeCount: 0,
          commentCount: 0,
          createdOn: timestamp(),
        });
      } catch (error) {
        setError(error);
        console.log(error.message);
      }
      setIsLoading(false);
    };

    if (post) {
      setIsLoading(true);
      if (post.media) {
        const file = post.media;
        const fileRef = storage.ref(file.name);

        fileRef.put(file).on(
          "state_changed",
          null,
          (error) => setError(error),
          async () => {
            const url = await fileRef.getDownloadURL();
            savePost({
              uid: post.uid,
              firstName: post.firstName,
              lastName: post.lastName,
              text: post.text,
              media: url,
            });
          }
        );
      } else {
        savePost({
          uid: post.uid,
          firstName: post.firstName,
          lastName: post.lastName,
          text: post.text,
          media: null,
        });
      }
    }
  }, [post]);

  return { isLoading, error };
};

export default useStorage;
