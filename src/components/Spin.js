import React from "react";
import { Modal, Spinner, Row, Container } from "react-bootstrap";
const Spin = (props) => {
  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal
        show={props.show}
        size="sm"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Container>
          <Row className="align-items-center justify-content-center ">
            <Modal.Body>
              <Row className="p-3 justify-content-center">
                <Spinner animation="border" variant="first" />
              </Row>
            </Modal.Body>
          </Row>
        </Container>
      </Modal>
    </>
  );
};

export default Spin;
