import { Add, Delete, Height, Remove } from "@mui/icons-material";
import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  incrementQuantity,
  selectCartItems,
  clearCart,
  removeFromCart,
} from "../redux/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity } from "../redux/slices/cart/cartSlice";
import { useParams } from "react-router-dom";
import {
  selectProducts,
  selectProductsStatus,
} from "../redux/slices/products/productSlice";
import CartSummary from "./CartSummary";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  title: string;
  description: string;
  image?: string;
  /* category?: Category; */
}

interface Category {
  id: number;
  name: string;
  image: string;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};
interface ProductCardProps {
  product: Product;
}

const CartItem = ({ item }: any) => {
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const status = useSelector(selectProductsStatus);

  function increaseQuantityHandler(item: CartItem) {
    dispatch(incrementQuantity(item));
  }
  function decreaseQuantityHandler(item: CartItem) {
    dispatch(decrementQuantity(item));
  }

  function removeFromCartHandler() {
    dispatch(removeFromCart(item.productId));
  }

  function clearFromCartHandler() {
    dispatch(clearCart());
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
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
              <TableCell align="right">${item.price * item.quantity}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => removeFromCartHandler()}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary />
        </Grid>
      </Grid> */}
    </>
  );
};

export default CartItem;
