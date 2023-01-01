import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "./components/TopNav";
import HomePage from "./pages/Home/index";
import "./App.css";

function App() {
  return (
    <div>
      <TopNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
