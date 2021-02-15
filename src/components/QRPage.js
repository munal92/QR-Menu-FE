import React, { useState } from "react";
import QRCodeLib from "qrcode";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
const QRPage = (props) => {
  const [urlData, setUrlData] = useState("");
  const [printPageStatus, setPrintPageStatus] = useState(false);
  console.log("URL Link", props.urlLink.Link);
  //   console.log("URL Data", urlData);

  function handlePrint() {
    setPrintPageStatus(true);

    setTimeout(() => {
      window.print();
      setPrintPageStatus(false);
    }, 1000);
  }

  QRCodeLib.toDataURL(props.urlLink.Link, {
    color: {
      dark: "#000", // Blue dots
      light: "#0000", // Transparent background
    },
  })
    .then((url) => {
      //   console.log(url);
      setUrlData(url);
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(printPageStatus);

  return (
    <div className="qrHero">
      {props.urlLink.Link === "NONE" ? (
        <Container className="pt-5 ">
          <Row className=" pt-5">
            <Col className=" text-center" xs={12}>
              {" "}
              <h1>Please Upload a File</h1>{" "}
            </Col>
          </Row>
          <Row className="pt-5">
            <Col className=" text-center" xs={12}>
              <Button size="lg" href="/user">
                Return
              </Button>
            </Col>
          </Row>
        </Container>
      ) : printPageStatus ? (
        <Container className="pt-5 ">
          <Row className=" pt-5">
            <Col className=" text-center" xs={12}>
              <h3 className="">{props.urlLink.title}</h3>
              {/* <img id="print" width="500" height="500" src={urlData} /> */}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className=" text-center" xs={12}>
              <Image className="qr-image" src={urlData} />
            </Col>
          </Row>{" "}
        </Container>
      ) : (
        <Container className="pt-5 ">
          <Row className=" pt-5">
            <Col className=" text-center" xs={12}>
              <h3 className="">{props.urlLink.title}</h3>
              {/* <img id="print" width="500" height="500" src={urlData} /> */}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className=" text-center" xs={12}>
              <Image className="qr-image" src={urlData} />
            </Col>
          </Row>{" "}
          <Row className="pt-5">
            <Col className=" text-center" xs={12}>
              <Button size="lg" onClick={handlePrint}>
                Print
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default QRPage;
