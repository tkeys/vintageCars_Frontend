import React from "react";
import { styled } from "@mui/material/styles";
import bannerpix from "../images/bannerpix.jpg";

export const BannerImage = styled("img")(({ src, theme }) => ({
  src: { bannerpix },
  width: "75vw",
  height: "60vh",
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
  },
}));
