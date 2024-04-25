import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import PrivateRoute from "./components/PrivateRoute";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import OrderPage from "./pages/OrderPage";
import MainOrderPage from "./pages/MainOrderPage";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./components/AdminRoute";
import OrderListPage from "./pages/admin/OrderListPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import UserListPage from "./pages/admin/UserListPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />}></Route>
      <Route path="/product/:id" element={<ProductPage />}></Route>
      <Route path="/search/:searchQuery" element={<HomePage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/placeorder" element={<OrderPage />}></Route>
        <Route path="/order/:id" element={<MainOrderPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />}></Route>
        <Route path="/admin/productlist" element={<ProductListPage />}></Route>
        <Route path="/admin/car/:id/edit" element={<ProductEditPage />}></Route>
        <Route path="/admin/userlist" element={<UserListPage />}></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
