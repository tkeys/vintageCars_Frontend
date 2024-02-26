import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductsStatus,
  selectProduct,
} from "../redux/slices/products/productSlice";

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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<any>();
  const status = useSelector(selectProductsStatus);

  function handleAddToCart() {
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

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 140, backgroundSize: "contain" }}
        image={product.category.image}
        alt={product.title}
      ></CardMedia>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/product/${product.id}`} size="small">
          View
        </Button>
        <Button size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
