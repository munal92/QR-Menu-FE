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
          <Row className="titleHome">
            <Col lg={6} className="justify-content-center align-self-center">
              <Row className="headerTitle justify-content-center mb-2">
                Create a QR menu for your restaurant
              </Row>
              <Row className="headerSubTitle  mb-5">Quick.Simple.Free.</Row>
              <Row className="homeButtonCont  mb-5">
                <Button href="#signupF" size="lg" variant="first">
                  Sign Up
                </Button>{" "}
              </Row>
            </Col>
            <Col lg={6} className="imageCol pl-5">
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
