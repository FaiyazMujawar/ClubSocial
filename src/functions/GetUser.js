import { firestore } from "../firebase/config";

/**
 * Get the details of the user
 * @param {String} userID ID of the user
 */
const getUser = async (userID) => {
  const user = await firestore.collection("users").doc(userID).get();
  return {
    uid: user.id,
    ...user.data(),
  };
};

export default getUser;
