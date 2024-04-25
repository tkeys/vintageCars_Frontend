import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { decodeToken } from "../utils/cartUtils";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const userData = decodeToken(userInfo?.token);
  console.log(userData);

  return userData && userData.userRole === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
