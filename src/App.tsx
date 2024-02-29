import React, { useState } from "react";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";

/*import ProductPage from "./pages/ProductPage";*/
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import Homepage from "./pages/Homepage";
import { ContactPage } from "@mui/icons-material";
import CartPage from "./pages/CartPage";
import Button from "@mui/material/Button";
import { error } from "console";
import { useTheme } from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import { Container } from "@mui/material";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state: any) => state.user.user);
  const { authUser } = user;
  console.log("user", user);
  console.log("authUser", authUser);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

        <Container>
          <Routes>
            <Route path="/" element={authUser ? <Homepage /> : <Login />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
