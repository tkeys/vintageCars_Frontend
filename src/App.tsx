import React from "react";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";

/*import ProductPage from "./pages/ProductPage";*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductPage from "./pages/ProductPage";
import Homepage from "./pages/Homepage";
import { ContactPage } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
