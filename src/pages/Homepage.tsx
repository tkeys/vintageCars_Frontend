import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ProductsPage from "./ProductsPage";
import { BannerImage } from "./BannerImage";
import bannerpix from "../images/bannerpix.jpg";
import { Link, NavLink } from "react-router-dom";

function Homepage() {
  return (
    <Box>
      <BannerImage src={bannerpix} alt="banner" />

      <Typography variant="h2">Welcome to a world of Shopping</Typography>
      <Button variant="contained" component={NavLink} to="/products">
        GO TO SHOP
      </Button>
    </Box>
  );
}

export default Homepage;
