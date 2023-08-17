import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  return (
    <ImageContext.Provider value={{ uploadedImages, setUploadedImages }}>
      {children}
    </ImageContext.Provider>
  );
};
