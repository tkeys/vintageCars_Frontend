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
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const CartPage = ({ product }: any) => {
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);

  return (
    <Box>
      {/*  <Typography variant="h2" gutterBottom>
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
      </Typography> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              {/* <TableCell align="right"></TableCell> */}
            </TableRow>
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
                  <IconButton color="error">
                    <Remove />
                  </IconButton>
                  {item.quantity}
                  <IconButton color="error">
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
      </TableContainer>
    </Box>
  );
};

export default CartPage;
