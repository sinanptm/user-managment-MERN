import React from "react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useLogoutMutation,
  useAdminLogoutMutation,
} from "../slices/usersApiSlice";
import { logout, adminLogout } from "../slices/authSlice";

const Header = () => {
  const { userInfo, adminInfo } = useSelector((state) => state.auth);
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
          <NavDropdown
            title={
              <>
                <Image
                  src={userInfo.image}
                  roundedCircle
                  width="30"
                  height="30"
                  alt="Profile"
                  className="me-2"
                />
                {userInfo.name}
              </>
            }
            id="username"
          >
            <NavDropdown.Item onClick={userLogoutHandler}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : adminInfo ? (
          <NavDropdown
            title={
              <>
                <Image
                  src={
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  roundedCircle
                  width="30"
                  height="30"
                  alt="Profile"
                  className="me-2"
                />
                Admin
              </>
            }
            id="adminUsername"
          >
            <NavDropdown.Item onClick={adminLogoutHandler}>
              Admin Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <Nav.Link as={NavLink} to="/login">
              <FaSignInAlt /> Sign In
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              <FaSignOutAlt /> Sign Up
            </Nav.Link>
          </>
        )}
      </>
    );
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            MERN APP
          </Navbar.Brand>
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
