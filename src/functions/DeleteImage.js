import { storage } from "../firebase/config";

/**
 * Deletes the image with specified URL from firebase.
 * @param {String} imageUrl URL of the image
 */
const deleteImage = async (imageUrl) => {
  console.log(`delete image called with ${imageUrl}`);
  if (imageUrl) {
    const imageRef = storage.refFromURL(imageUrl);
    await imageRef.delete();
  }
};

export default deleteImage;
