import React from "react";
import KakaoPostcode from "react-daum-postcode";

const AddressSearch = ({ onComplete, isOpen, onClose }) => {
  return (
    <KakaoPostcode
      autoClose
      animation
      onComplete={onComplete}
      isOpen={isOpen}
      onClose={onClose}
      width={400}
      height={500}
    />
  );
};

export default AddressSearch;
