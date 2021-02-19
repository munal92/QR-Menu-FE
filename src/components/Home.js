import React, { useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import SignUpForm from "./SignUpForm.js";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import phoneImg from "../img/phoneHe.png";
import MidSection from "./MidSection.js";

const Home = () => {
  /// since the heroku server is free for better user experince making a get req
  /// to wake up the server :)
  useEffect(() => {
    axiosWithAuth()
      .get("/")
      .then()
      .catch((err) => {
        console.error(err);
      });
  }, []);
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
