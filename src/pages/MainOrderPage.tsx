import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../redux/slices/ordersApiSlice";

const MainOrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  if (isLoading) {
    return isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">There is an error</Message>
    ) : (
      <>
        <h1>Order {orderId}</h1>
        <Row>
          <Col md={8}>Column</Col>
          <Col md={4}>Column</Col>
        </Row>
      </>
    );
  }

  return <div> Main Order Page</div>;
};

export default MainOrderPage;
