import { useState, useEffect } from "react";

const useFile = (file) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      if (["image/jpg", "image/jpeg", "image/png"].includes(file.type))
        setError("Please select an image file only");
      else setError(null);
      console.log(file);
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setLoading(false);
      };
    } else setImageSrc(null);
  }, [file]);

  return { imageSrc, loading, error };
};

export default useFile;
