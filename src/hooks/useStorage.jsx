import { useState, useEffect } from "react";

import createPost from "../functions/CreatePost";
import saveImage from "../functions/SaveImage";

const useStorage = (post) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Saves the new post to firestore
    if (post) {
      setIsLoading(true);
      if (post.media) {
        saveImage(
          post.media,
          (error) => setError(error),
          (url) =>
            createPost({
              uid: post.uid,
              firstName: post.firstName,
              lastName: post.lastName,
              text: post.text,
              userProfile: post.userProfile,
              media: url,
            })
              .then(() => {
                console.log("saved");
                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
                setError(error);
              })
        );
      } else {
        createPost({
          uid: post.uid,
          firstName: post.firstName,
          lastName: post.lastName,
          text: post.text,
          userProfile: post.userProfile,
          media: null,
        })
          .then(() => {
            console.log("saved");
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      }
    }
  }, [post]);

  return { isLoading, error };
};

export default useStorage;
