import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
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
    <div className="SignupHero">
      <Container className="d-flex flex-column justify-content-center pt-5 pb-5 ">
        <Form onSubmit={submitForm} className={vibrate.clsName}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
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
          <Button type="submit">Sign Up!</Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignUpForm;
