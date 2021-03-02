import { firestore, timestamp } from "../firebase/config";

/**
 * Saves a post to firestore.
 * @param post Post to be saved
 */
const createPost = async (post) => {
  console.log("creating post", post);
  const { uid, firstName, lastName, text, media, userProfile } = post;
  try {
    await firestore.collection("posts").add({
      userId: uid,
      firstName,
      lastName,
      text,
      media,
      userProfile,
      likeCount: 0,
      commentCount: 0,
      createdOn: timestamp(),
    });
  } catch (error) {
    console.log("in catch");
    console.log({ error });
  }
  console.log("created");
};

export default createPost;
