import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import ImageUploader from "./ImageUploader";

const ImageBoard = () => {
  const storage = getStorage();
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = async (urls) => {
    setImageUrls(urls);
  };

  return (
    <div>
      <button onClick={() => setShowImageUploader(true)}>사진 첨부</button>

      {/* ImageUploader component */}
      {showImageUploader && (
        <ImageUploader
          onImageUpload={(urls) => {
            handleImageUpload(urls);
            setShowImageUploader(false); // Close the ImageUploader
          }}
        />
      )}

      {/* Display uploaded images */}
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageBoard;
