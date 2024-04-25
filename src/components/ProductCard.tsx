import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

import { ProductType } from "../misc/type";

const ProductCard = ({ car }: { car: ProductType }) => {
  console.log(car);
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${car._id}`}>
        <Card.Img src={car.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${car._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{car.model}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={car.rating} text={""} />
        </Card.Text>
        <Card.Text as="h3">${car.price}</Card.Text>
        <Card.Text as="h5">#{car.description}</Card.Text>
        <Card.Text as="h5">Year:{car.year}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
