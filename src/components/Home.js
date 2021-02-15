import React from "react";
import SignUpForm from "./SignUpForm.js";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div className="containerHeader d-flex justify-content-center pt-5">
        <Container fluid="md" className="mt-5 mb-4 ">
          <Row className="text-center pr-1 pl-1">
            <Col>
              <Row className="headerTitle justify-content-center">
                Create a QR menu for your restaurant
              </Row>
              <Row className="headerSubTitle justify-content-center mt-3">
                Quick.Simple.Free.
              </Row>
              <Row className="justify-content-center mt-5">
                <Button size="lg" variant="warning">
                  Sign Up
                </Button>{" "}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <SignUpForm />
    </>
  );
};

export default Home;
