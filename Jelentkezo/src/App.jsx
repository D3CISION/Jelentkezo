import { useState } from "react";
import "./App.css";
import Bejelentkezes from "./components/Bejelentkezes";
import Fooldal from "./components/Fooldal";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bejelentkezes />} />
          <Route path="/Fooldal" element={<Fooldal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
