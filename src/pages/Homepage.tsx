import React from "react";
import { Box, Typography } from "@mui/material";
import ProductsPage from "./ProductsPage";

function Homepage() {
  return (
    <Box>
      <Typography variant="h2">
        Homepage is here
        <ProductsPage />
      </Typography>
    </Box>
  );
}

export default Homepage;
