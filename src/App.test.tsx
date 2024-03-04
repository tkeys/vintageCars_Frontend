import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Login, ContactPage } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";

test("renders learn react link", () => {
  render(
    <div className="App">
      <Container>
        <Routes>
          {/* <Route path="/" element={authUser ? <Homepage /> : <Login />} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Container>
    </div>
  );
  const linkElement = screen.getByText(/emart/i);
  expect(linkElement).toBeInTheDocument();
});
