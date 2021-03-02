import { useState, useEffect } from "react";
import { firestore } from "../firebase/config";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore
      .collection("comments")
      .orderBy("createdOn", "desc")
      .onSnapshot((snapshot) => {
        const comments = [];
        snapshot.forEach((comment) => {
          if (comment.postId === postId)
            comments.push({ id: comment.id, ...comment.data() });
        });
        setComments(comments);
      });

    return unsubscribe;
  }, [postId]);

  return { comments };
};

export default useComments;
