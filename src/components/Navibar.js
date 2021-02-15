import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Route, Link } from "react-router-dom";

import Login from "./Login.js";
const Navibar = (props) => {
  const [navbarStatus, setNavbarStatus] = useState(false);
  const clearToken = (e) => {
    setNavbarStatus(false);
    window.localStorage.clear();
  };

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
      <Navbar className="navibarC" collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logoTxt">
            QR MENU
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>

            {navbarStatus !== true ? (
              <Nav>
                {" "}
                <Nav.Link as={Link} active to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} active to="/signin">
                  Sign In
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
