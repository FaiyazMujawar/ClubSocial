import { firestore } from "../firebase/config";

/**
 * Gets a list of posts created by the user
 * @param {String} userId ID of user
 * @returns {Promise<Document[]>} list of user's posts
 */
const getUserPosts = async (userId) => {
  const posts = [];
  const data = await firestore
    .collection("posts")
    .where("userId", "==", userId)
    .get();

  data.forEach((post) => posts.push({ ...post.data(), id: post.id }));

  return posts.sort((a, b) => b.createdOn.seconds - a.createdOn.seconds);
};

export default getUserPosts;
