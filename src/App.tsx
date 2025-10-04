import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter basename="/mp2">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/item/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;