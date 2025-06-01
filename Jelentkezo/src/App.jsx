import { useState } from "react";
import "./App.css";
import Bejelentkezes from "./components/Bejelentkezes";
import Fooldal from "./components/Fooldal";
import Admin from "./components/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/AdminPassword";

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bejelentkezes />} />
          <Route path="/Fooldal" element={<Fooldal />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        
        <ToastContainer toastStyle={{zIndex: "1000"}}/>
      </BrowserRouter>
    </>
  );
}

export default App;
