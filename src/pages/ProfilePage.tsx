import React from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/auth/authSlice";
import { useGetMyOrdersQuery } from "../redux/slices/ordersApiSlice";

import { decodeToken } from "../utils/cartUtils";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  console.log("UserInfo is ", userInfo);
  const [userName, setUserName] = useState(userInfo.userName);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userData = decodeToken(userInfo?.token);
  console.log("My user data info is ", userData);
  console.log("My user id data info is ", userData.userId);
  const id = userData.userId;
  const orderListId = userData.orderHistory[0];

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery({ orderListId, userId: id });
  console.log("My Order are", orders);

  useEffect(() => {
    if (userData) {
      setUserName(userData.userName);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
    }
  }, [userInfo, userInfo.userName, setFirstName, setLastName, userInfo.email]);
  //note here too dependency could also be [userInfo.userName, userInfo.firstName, userInfo.lastName, userInfo.email]

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          /*  id: userData.userId, */
          userName,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }).unwrap();
        dispatch(setCredentials(res)); //note here could be {...res}
        toast.success("Profile Updated successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="userName" className="my-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastname" className="my-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            Update Profile
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            "Unknown Error occurred. Please try again later."
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.data.orders.map((order: any) => (
                <tr key={order._id}>
                  <td> {order.quantity}</td>
                  <td>{order._id}</td>
                  <td>{order.orderSum}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
