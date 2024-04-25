import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { CartState, CartItem } from "../misc/type";
import { RootState } from "../redux/store";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import SearchBox from "./SearchBox";
import { logout } from "../redux/slices/auth/authSlice";
import { decodeToken } from "../utils/cartUtils";

const Header = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const userData = decodeToken(userInfo?.token);
  console.log(userData);

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout(userInfo));
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" />
              My VintageCAR SHOP
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce(
                        (totalQuantity: any, cartItem: { quantity: any }) =>
                          totalQuantity + cartItem.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={`Hi,${userData.firstName}`} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer onClick={logoutHandler} to="/login">
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser />
                    Sign-in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userData && userData.userRole === "Admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
