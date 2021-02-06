import { useState, useEffect } from "react";

const useFile = (file) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => setImageSrc(event.target.result);
    } else setImageSrc(null);
  }, [file]);

  return { imageSrc };
};

export default useFile;
