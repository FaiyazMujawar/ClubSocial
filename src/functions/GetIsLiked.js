import { firestore } from "../firebase/config";

/**
 * Checks whether the specified user has liked the specified post or not
 * @param {String} postId ID of the post
 * @param {String} userId ID of the user
 * @returns {Promise<Boolean>} True if user has liked the post, else false.
 */
const getIsLiked = async (postId, userId) => {
  const likes = await firestore
    .collection("likes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  return !likes.empty;
};

export default getIsLiked;
