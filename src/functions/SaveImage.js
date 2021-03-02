import { storage } from "../firebase/config";

/**
 * Stores an image to the firebase.
 * @param {File} file Image to be stored
 * @param {Function} onError Callback to execute when an error occurs.
 * @param {Function} onSuccess Callback to execute when image is stored
 * successfully.
 */
const saveImage = async (file, onError, onSuccess) => {
  const fileRef = storage.ref(file.name);

  fileRef.put(file).on("state_changed", null, onError, async () => {
    const url = await fileRef.getDownloadURL();
    onSuccess(url);
  });
};

export default saveImage;
