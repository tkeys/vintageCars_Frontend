import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useFetchProductQuery } from "../redux/slices/products/productSlice";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cart/cartSlice";
import { ProductType } from "../misc/type";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...car, quantity }));
    /* console.log(`Item with ${productId} added to cart!`);
    console.log(car); */
    navigate("/cart");
  };

  const productId = id ?? "";
  const {
    data: car,
    isLoading,
    error,
  } = useFetchProductQuery(productId as string);
  //console.log(car);
  console.log(productId);

  if (productId) {
    console.log(`fetching product for productID ${productId}`);
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">error?.data?.message || error.error</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={car.image} alt={car.model} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{car.model}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{car.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>Brand:{car.brand.brand}</ListGroup.Item>
              <ListGroup.Item>
                <p>Year:{car.year}</p>
              </ListGroup.Item>

              <ListGroup.Item>Price:${car.price}</ListGroup.Item>
              <ListGroup.Item>
                Conditions:{car.conditions[0].name}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${car.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {Array.from({ length: 10 }, (x, i) => i + 1).map(
                          (x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button onClick={addToCartHandler}>Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
