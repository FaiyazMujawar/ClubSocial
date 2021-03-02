import { firestore } from "../firebase/config";

const updateUser = async (user) => {
  const {
    uid,
    firstName,
    lastName,
    dob,
    gender,
    relationshipStatus,
    profileImg,
    bio,
  } = user;
  await firestore.collection("users").doc(uid).set({
    firstName,
    lastName,
    dob,
    gender,
    relationshipStatus,
    profileImg,
    bio,
  });
};

export default updateUser;
