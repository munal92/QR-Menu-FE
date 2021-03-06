import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const MidSection = () => {
  return (
    <div className="MidSecHero p-3">
      <Container className="midsecCont d-flex flex-column  p-5 mb-5 border border-first bg-white rounded">
        <Row className="text-center mb-5">
          <Col lg={12}>
            <h1>
              <span className="border-bottom border-first  pb-2 ">
                3 Easy Steps
              </span>
            </h1>
          </Col>
        </Row>
        <Row className="text-center mb-3 mt-3">
          <Col lg={4}>
            <Row className="justify-content-center pb-3">
              <h2 className="border border-first rounded-circle px-3 py-1 ">
                1
              </h2>
            </Row>
            <Row className="justify-content-center mb-3">
              <h3>Create an account</h3>
            </Row>
          </Col>

          <Col lg={4}>
            <Row className="justify-content-center pb-3">
              <h2 className="border border-first rounded-circle px-3 py-1 ">
                2
              </h2>
            </Row>
            <Row className="justify-content-center mb-3">
              <h3> Upload the Menu</h3>
            </Row>
          </Col>
          <Col lg={4}>
            <Row className="justify-content-center pb-3">
              <h2 className="border border-first rounded-circle px-3 py-1">
                3
              </h2>
            </Row>
            <Row className="justify-content-center">
              <h3>Create a Free QR Code</h3>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MidSection;
