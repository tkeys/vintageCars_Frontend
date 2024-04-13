import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to MCAR Shop</h1>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default App;
