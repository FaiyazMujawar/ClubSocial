import { firestore } from "../firebase/config";
import deleteImage from "./DeleteImage";

/**
 * Deletes the post with specified ID & all of it's related content from
 * firestore
 * @param {String} postId ID of the post
 */
const deletePost = async (postId, imageURL) => {
  await deleteImage(imageURL);

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
