import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./Main";
import Todopage from "./Todopage";
import Yumpage from "./Yumpage";
import ImageUploader from "./ImageUploader"; // Import the ImageUploader component
import { ImageProvider } from "./ImageContext"; // Import the ImageContext and ImageProvider

function App() {
  return (
    <BrowserRouter>
      <ImageProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Todopage" element={<Todopage />} />
            <Route path="/yumpage" element={<Yumpage />} />
            <Route path="/imageuploader" element={<ImageUploader />} />{" "}
            {/* Add this line */}
          </Routes>
        </div>
      </ImageProvider>
    </BrowserRouter>
  );
}

export default App;
