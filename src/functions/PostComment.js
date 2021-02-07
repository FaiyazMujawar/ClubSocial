import { firestore, timestamp } from "../firebase/config";

/**
 * Posts a comment on the post with provided ID
 * @param {String} postId ID of the post
 * @param {String} userId ID of the user
 * @param {String} firstName First name of the user
 * @param {String} lastName Last name of the user
 * @param {String} comment Actual comment
 */
const postComment = async (postId, userId, firstName, lastName, comment) => {
  const post = await firestore.collection("posts").doc(postId).get();
  const postData = post.data();

  const newComment = await firestore.collection("comments").add({
    postId,
    userId,
    firstName,
    lastName,
    comment,
    createdOn: timestamp(),
  });

  await post.ref.update({
    commentCount: postData.commentCount + 1,
  });

  return {
    id: newComment.id,
    ...(await newComment.get()).data(),
  };
};

export default postComment;
