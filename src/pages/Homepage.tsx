import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductType } from "../misc/type";
import { useFetchProductsQuery } from "../redux/slices/products/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { searchQuery } = useParams<{ searchQuery: string }>();
  const { data, isLoading, error } = useFetchProductsQuery(searchQuery || "");

  if (data) {
    console.log(data);
  }
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      {searchQuery && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">error?.data?.message || error.error</Message>
      ) : (
        <>
          <h1>Latest products</h1>;
          <Row>
            {data &&
              data?.cars &&
              data?.cars.map((car) => (
                <Col key={car._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard car={car} />
                </Col>
              ))}

            {/* {data &&
              data?.cars &&
              data?.cars.map((car) => (
                <ProductCard
                  //_id={car._id}
                  description={car.description}
                  image={car.image}
                  model={car.model}
                  brand={car.brand}
                  key={car._id}
                  price={car.price}
                  year={car.year}
                  rating={car.rating}
                  //key={car._id}
                  car={car}
                />
              ))} */}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
