import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import Login from "./Login.js";

const Navibar = () => {
  const [navbarStatus, setNavbarStatus] = useState(false);
  /// if user click the logout, clean the local storage
  const clearToken = (e) => {
    setNavbarStatus(false);
    window.localStorage.clear();
  };
  /// checking token and show profile button or not
  useEffect(() => {
    let status = window.localStorage.getItem("token");
    if (status) {
      setNavbarStatus(true);
    } else {
      setNavbarStatus(false);
    }
  });

  return (
    <>
      <Navbar className="navibarC" collapseOnSelect expand="sm" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logoTxt">
            <span style={{ color: "#ffef76" }}>QR</span> MENU
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>

            {navbarStatus !== true ? (
              <Nav>
                {" "}
                <Nav.Link as={Link} active to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} active to="/signin">
                  <a className="signInBtn">Sign In</a>
                </Nav.Link>{" "}
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} active to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} active to="/user">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} active to="/" onClick={clearToken}>
                  Log Out
                </Nav.Link>{" "}
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
        <Route path="/signin">
          <Login />
        </Route>
      </Navbar>
    </>
  );
};

export default Navibar;
