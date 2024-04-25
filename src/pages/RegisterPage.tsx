import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/auth/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: any) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          userName,
          email,
          password,
          firstName,
          lastName,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Sign up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="my-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="firstname" className="my-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
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
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.We promise!!
          </Form.Text>
        </Form.Group>
      </Form>
      <Form onSubmit={handleSubmit}>
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
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={isLoading}
        >
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row>
        <Col>
          Already have an account?{""}
          <Link to={redirect ? `/login?redirect =${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
