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
import { Remove, Add, Delete } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import {
  selectProducts,
  selectProductsStatus,
} from "../redux/slices/products/productSlice";
import { useDispatch } from "react-redux";
import { Type } from "typescript";
import { Link, useParams } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
} from "../redux/slices/cart/cartSlice";

const CartPage = ({ product }: any) => {
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const status = useSelector(selectProductsStatus);

  /* const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  }; */
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
