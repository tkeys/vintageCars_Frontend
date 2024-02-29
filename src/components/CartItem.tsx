import { Add, Delete, Height, Remove } from "@mui/icons-material";
import {
  CardMedia,
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
} from "../redux/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity } from "../redux/slices/cart/cartSlice";
import { useParams } from "react-router-dom";
import {
  selectProducts,
  selectProductsStatus,
} from "../redux/slices/products/productSlice";

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

  return (
    <>
      {/* <CardMedia
        component="img"
        height={140}
        image={item.image}
        alt={item.title}
      ></CardMedia>

      <Typography variant="h4" gutterBottom>
        Product:{item.title}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Price:${item.price}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Quantity:{item.quantity}
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
            <TableRow
            /* sx={{ "&:last-child td, &:last-child th": { border: 0 } }} */
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
              <TableCell align="right">${item.price * item.quantity}</TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CartItem;
