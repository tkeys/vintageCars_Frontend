import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import {
  selectProducts,
  fetchProducts,
} from "../redux/slices/products/productSlice";
import { Box, Grid, Typography } from "@mui/material";

const ProductsPage = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product: any) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
      ProductsPage
    </div>
  );
};

export default ProductsPage;
