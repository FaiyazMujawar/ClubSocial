import { firestore, storage } from "../firebase/config";

/**
 * Deletes the post with specified ID & all of it's related content from
 * firestore
 * @param {String} postId ID of the post
 */
const deletePost = async (postId, imageURL) => {
  if (imageURL) {
    const imageRef = storage.refFromURL(imageURL);
    imageRef.delete();
  }
  await firestore.collection("posts").doc(postId).delete();
  const likes = await firestore
    .collection("likes")
    .where("postId", "==", postId)
    .get();

  likes.forEach((like) => like.ref.delete());

  const comments = await firestore
    .collection("comments")
    .where("postId", "==", postId)
    .get();

  comments.forEach((comment) => comment.ref.delete());
};

export default deletePost;
