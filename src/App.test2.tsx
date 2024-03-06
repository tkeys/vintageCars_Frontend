import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Login, ContactPage } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/emart/i);
  expect(linkElement).toBeInTheDocument();
});
