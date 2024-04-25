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
  const { id: orderListId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderListId);
  console.log(order);

  if (isLoading) {
    return isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">There is an error</Message>
    ) : (
      <>
        <h1>Order {order}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Details</h2>
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    {/* <Col>${order.itemsPrice}</Col> */}
                  </Row>
                </ListGroup.Item>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">There is an error</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>Column</Col>
        </Row>
      </>
    );
  }

  return <div> Main Order Page</div>;
};

export default MainOrderPage;
