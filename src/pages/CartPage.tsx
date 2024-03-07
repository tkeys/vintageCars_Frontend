import React from "react";
import { useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
} from "../redux/slices/cart/cartSlice";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CartItem from "../components/CartItem";

import {
  selectProducts,
  selectProductsStatus,
} from "../redux/slices/products/productSlice";

import { Link, useParams } from "react-router-dom";
import { Paper } from "@mui/material";

const CartPage = ({ product }: any) => {
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);

  const status = useSelector(selectProductsStatus);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Cart
      </Typography>

      <Typography variant="h5" gutterBottom>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.productId} item={item} />)
        ) : (
          <Typography>Cart is empty</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
        >
          Checkout
        </Button>
      </Typography>
    </Box>
  );
};

export default CartPage;
