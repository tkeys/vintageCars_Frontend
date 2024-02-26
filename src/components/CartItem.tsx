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

const CartItem = ({ item }: any) => {
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
      </Typography>
      <Typography variant="h4" gutterBottom>
        ProductId:{item.productId}
      </Typography>
 */}
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
          <TableBody sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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

              <TableCell align="center">${item.price}</TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Remove />
                </IconButton>
                {item.quantity}
                <IconButton color="error">
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
