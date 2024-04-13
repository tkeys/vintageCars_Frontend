import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import products from "../components/products";
import ProductCard from "../components/ProductCard";
import { Product } from "../misc/type";
import { useFetchProductsQuery } from "../redux/slices/products/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
  const { data: products, isLoading, error } = useFetchProductsQuery();
  if (!products) {
    return <Loader />;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">error?.data?.message || error.error</Message>
      ) : (
        <>
          <h1>Latest products</h1>;
          <Row>
            {products.map((product: Product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
