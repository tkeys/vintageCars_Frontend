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
import { useParams } from "react-router-dom";
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
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Typography>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              {/* <TableCell align="right"></TableCell> */}
      {/*  </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="centre">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ height: 50, marginRight: 20 }}
                    ></img>
                    {item.title}
                  </Box>
                </TableCell>

                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => decreaseQuantityHandler(item)}
                  >
                    <Remove />
                  </IconButton>
                  {item.quantity}
                  <IconButton
                    color="error"
                    onClick={() => increaseQuantityHandler(item)}
                  >
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  ${item.price * item.quantity}
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default CartPage;
