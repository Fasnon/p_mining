import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p_mining" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
