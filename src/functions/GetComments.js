import { firestore } from "../firebase/config";

/**
 * Function to get comments for specified post.
 * @param {String} postId ID of the post
 * @returns {Promise<Object>} List of comments for the specified post
 */
const getComments = async (postId) => {
  const comments = [];

  const commentsData = await firestore
    .collection("comments")
    .where("postId", "==", postId)
    .get();
  console.log(commentsData.docs);
  commentsData.forEach((comment) =>
    comments.push({ id: comment.id, ...comment.data() })
  );

  return comments;
};

export default getComments;
