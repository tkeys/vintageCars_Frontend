import React from "react";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";

/*import ProductPage from "./pages/ProductPage";*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
