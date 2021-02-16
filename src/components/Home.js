import React from "react";
import SignUpForm from "./SignUpForm.js";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import phoneImg from "../img/phoneHe.png";
import MidSection from "./MidSection.js";

const Home = () => {
  return (
    <>
      <div className="containerHeader">
        <Container>
          <Row className="titleHome align-items-center">
            <Col md={6} xs={10}>
              <Row className="headerTitle align-items-center">
                Create a QR menu for your restaurant
              </Row>
              <Row className="headerSubTitle align-items-center mt-3">
                Quick.Simple.Free.
              </Row>
              <Row className="homeButtonCont align-items-center mt-5">
                <Button href="#signupF" size="lg" variant="teal1">
                  Sign Up
                </Button>{" "}
              </Row>
            </Col>
            <Col md={6} className="imageCol pl-5">
              <Image src={phoneImg} fluid></Image>
            </Col>
          </Row>
        </Container>
      </div>
      <MidSection />
      <SignUpForm />
    </>
  );
};

export default Home;
