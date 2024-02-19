import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios
      .get(` https://fakestoreapi.com/products/${id}`)

      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
    console.log(product);
    setLoading(false);
  }, [product, id]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!product) {
    return <div>Product not found ooooo</div>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height={140}
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
        <Typography variant="body2" color="text.secondary">
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetails;
