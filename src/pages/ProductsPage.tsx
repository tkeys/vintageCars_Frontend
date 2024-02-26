import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import {
  selectProducts,
  fetchProducts,
  filterProductsByCategory,
  sortProductsByPrice,
} from "../redux/slices/products/productSlice";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CartPage from "./CartPage";

const ProductsPage = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector(selectProducts);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Electronics",
    "Books",
    "Clothes",
    "Home",
    "Sports",
    "Furniture",
    "Shoes",
    "Miscellaneous",
  ];

  useEffect(() => {
    console.log("Fetching products");
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value as string;
    console.log(`Filtering products by category: ${category}`);
    setSelectedCategory(category);
    dispatch(filterProductsByCategory(category));
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    console.log(`Sorting products by ${newOrder.toUpperCase()} order`);
    setSortOrder(newOrder);
    dispatch(sortProductsByPrice(newOrder));
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl>
            <Select
              value={selectedCategory}
              onChange={(event) =>
                handleCategoryChange(
                  event as unknown as React.ChangeEvent<HTMLSelectElement>
                )
              }
              displayEmpty
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <Box sx={{ m: 1, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Sort by
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleSortOrder}
                >
                  Price
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleSortOrder}
                >
                  Name
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>

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
