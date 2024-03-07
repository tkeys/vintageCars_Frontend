import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchProduct,
  selectProduct,
  selectProductsStatus,
} from "../redux/slices/products/productSlice";
import { addToCart, removeFromCart } from "../redux/slices/cart/cartSlice";
import ProductCard from "../components/ProductCard";
import ProductsPage from "./ProductsPage";

const ProductPage = () => {
  const dispatch = useDispatch<any>();
  const { id } = useParams<{ id: string }>();
  const status = useSelector(selectProductsStatus);
  const product = useSelector(selectProduct);

  useEffect(() => {
    if (id) {
      console.log(`Fetching product for productID: ${id}`);
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      console.log(`Adding to cart for productID: ${product.id}`);
      dispatch(
        addToCart({
          productId: product.id,
          quantity: 1,
          price: product.price,
          title: product.title,
          description: "",

          image: product.category.image,
        })
      );
    }
  };
  if (status === "loading") {
    console.log("Loading product details...");
    return <CircularProgress />;
  }

  if (status === "failure" || !product) {
    console.log("Failed to load product details or product not found...");
    return (
      <Typography variant="h5">
        Product not found or an error occured
      </Typography>
    );
  }
  console.log("Displaying product details...");

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <CardMedia
        component="img"
        height={300}
        width={200}
        image={product.category.image}
        alt={product.title}
      ></CardMedia>
      {/* <Typography variant="h3">Product Detail</Typography> */}
      <Typography variant="h4">{product.title}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h6"> ${product.price}</Typography>

      <Button variant="contained" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductPage;
