import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
const SignUpForm = () => {
  const [signUpForm, setSignUpForm] = useState({
    credientials: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isCredentials, isSetCredentials] = useState(true);
  const history = useHistory();

  const [vibrate, setVibrate] = useState({
    clsName: "",
  });

  const handleChange = (e) => {
    e.persist();

    setSignUpForm({
      ...signUpForm,
      credientials: {
        ...signUpForm.credientials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      signUpForm.credientials.name !== "" &&
      signUpForm.credientials.email !== "" &&
      signUpForm.credientials.password !== ""
    ) {
      axiosWithAuth()
        .post("/api/auth/signup", signUpForm.credientials)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("StayLogIN", false);
          window.localStorage.setItem("userEmail", res.data.email);
          setTimeout(() => {
            history.push("/user");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          isSetCredentials(false);
          setVibrate({ clsName: "error" });

          setTimeout(() => {
            setVibrate({ clsName: "" });
          }, 1000);
        });
    } else {
      setVibrate({ clsName: "error" });

      setTimeout(() => {
        setVibrate({ clsName: "" });
      }, 1000);
    }
  };
  return (
    <div className="SignupHero">
      <Container className="p-4">
        <Row className="justify-content-center">
          <h2>Sign Up Now!</h2>
        </Row>
        <Row className=" justify-content-center pt-3">
          <Col md={6}>
            <Form onSubmit={submitForm} className={vibrate.clsName}>
              {isCredentials ? (
                ""
              ) : (
                <Form.Text className="alert-text-form">
                  Email address is already taken. Please choose another one.
                </Form.Text>
              )}
              <Form.Group controlId="formBasicName">
                <Form.Label id="signupF">Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
              <Row className="justify-content-center pt-4">
                <Button type="submit">Sign Up!</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpForm;
