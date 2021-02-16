import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
const MidSection = () => {
  return (
    <div className="MidSecHero ">
      <Container className="p-4">
        <Row className="justify-content-center mb-5">
          <h1>3 Easy Steps</h1>{" "}
        </Row>

        <Row className="justify-content-center">
          <h2>Create an account</h2>{" "}
        </Row>
        <Row className="justify-content-center my-3">
          <i class="fas fa-arrow-down fa-2x"></i>
        </Row>
        <Row className="justify-content-center">
          <h2>Upload the Menu</h2>{" "}
        </Row>
        <Row className="justify-content-center my-3">
          <i class="fas fa-arrow-down fa-2x"></i>
        </Row>
        <Row className="justify-content-center text-justify">
          <h2>Create a Free QR Code</h2>{" "}
        </Row>
      </Container>
    </div>
  );
};

export default MidSection;
