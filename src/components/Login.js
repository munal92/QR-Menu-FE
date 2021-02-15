import React, { useState } from "react";
import { Container, Button, Row, Col, Modal, Form } from "react-bootstrap";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [signInForm, setSignInForm] = useState({
    credientials: {
      email: "",
      password: "",
    },
    isChecked: false,
  });
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [vibrate, setVibrate] = useState({
    clsName: "",
  });
  const handleClose = () => {
    setShow(false);
    history.push("/");
  };

  const handleChange = (e) => {
    e.persist();

    if (e.target.name === "isChecked") {
      setSignInForm({
        ...signInForm,
        isChecked: signInForm.isChecked ? false : true,
      });
    } else {
      setSignInForm({
        ...signInForm,
        credientials: {
          ...signInForm.credientials,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      signInForm.credientials.username !== "" &&
      signInForm.credientials.password !== ""
    ) {
      axiosWithAuth()
        .post("/api/auth/signin", signInForm.credientials)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          if (signInForm.isChecked) {
            window.localStorage.setItem("StayLogIN", true);
          } else {
            window.localStorage.setItem("StayLogIN", false);
          }
          history.push("/user");
        })
        .catch((err) => console.log(err));
    } else {
      setVibrate({ clsName: "error" });

      setTimeout(() => {
        setVibrate({ clsName: "" });
      }, 1000);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex justify-content-center">
            <Form onSubmit={submitForm} className={vibrate.clsName}>
              <Row>
                <Col className="text-center py-3">
                  <h2>Welcome!</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                      Sign In and start to create a QR Code
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                    {/* <Form.Control type="password" placeholder="Password" /> */}
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Keep me signed in"
                      name="isChecked"
                      checked={signInForm.isChecked}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" type="submit" onClick={submitForm}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
