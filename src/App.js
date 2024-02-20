import "./assets/styles/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Overview />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
