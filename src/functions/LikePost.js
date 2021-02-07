import { firestore } from "../firebase/config";

/**
 * Toggles the like for a given post. Increments/Decrements likeCount
 * accordingly
 * @param {String} postId ID of the post
 * @param {String} userId ID of the user
 */
const toggleLike = async (postId, userId) => {
  const likesRef = firestore.collection("likes");
  const post = await firestore.collection("posts").doc(postId).get();
  if (post.exists) {
    const likes = await likesRef.where("postId", "==", postId).get();
    let userHasLiked = false;
    let likeCount = 0;
    let likeId = null;
    likes.forEach((like) => {
      if (like.data().userId === userId) {
        userHasLiked = true;
        likeId = like.id;
      }
      likeCount++;
    });

    if (userHasLiked) {
      likesRef.doc(likeId).delete();
      post.ref.update({
        likeCount: likeCount - 1,
      });
    } else {
      likesRef.add({
        postId,
        userId,
      });
      post.ref.update({
        likeCount: likeCount + 1,
      });
    }
  }
};

export default toggleLike;
