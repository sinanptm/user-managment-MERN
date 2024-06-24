import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useLogoutMutation,
  useAdminLogoutMutation,
} from "../Slices/usersApiSlice";
import { logout, adminLogout } from "../Slices/authSlice";

const Header = () => {
  const { userInfo, adminInfo } = useSelector((state) => state.auth); // Fetch both userInfo and adminInfo from Redux state
  const [logoutApiCall] = useLogoutMutation();
  const [adminLogoutApiCall] = useAdminLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const adminLogoutHandler = async () => {
    try {
      await adminLogoutApiCall().unwrap();
      dispatch(adminLogout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const DropDown = () => {
    return (
      <>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username">
            <NavDropdown.Item onClick={userLogoutHandler}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : adminInfo ? (
          <NavDropdown title="Admin" id="adminUsername">
            <NavDropdown.Item onClick={adminLogoutHandler}>
              Admin Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <LinkContainer to="/login">
              <Nav.Link>
                <FaSignInAlt /> Sign In
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>
                <FaSignOutAlt /> Sign Up
              </Nav.Link>
            </LinkContainer>
          </>
        )}
      </>
    );
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN APP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <DropDown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
