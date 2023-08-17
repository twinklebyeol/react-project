

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./Main";
import Todopage from "./Todopage";
import Yumpage from "./Yumpage";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />          
          <Route path="/Todopage" element={<Todopage />} />
          <Route path="/yumpage" element={<Yumpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



