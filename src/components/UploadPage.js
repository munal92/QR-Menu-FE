import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import grayBg from "../img/graybg.png";
import grayBgUpload from "../img/graybgupload.jpg";
import grayBgUploadSuccess from "../img/graybgUploadSuccess.png";

const UploadPage = (props) => {
  const inputFile = useRef(null);
  const [selectedFile, SetSelectedFile] = useState({
    fileName: "",
    fileLink: null,
    uploadSuccess: false,
  });

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const handleChangeFile = (e) => {
    e.persist();
    console.log("Yuklendi", e.target.files[0]);
    SetSelectedFile({
      ...selectedFile,
      fileLink: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };
  const handlerChangeText = (e) => {
    e.persist();
    //console.log("Yuklendi", e.target.value);
    props.setUrlLink({ ...props.urlLink, title: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("upload", selectedFile.fileLink);
    fd.append("name", selectedFile.name);
    console.log("button basildi", fd);

    axiosWithAuth()
      .put(`/api/user/addinfo/6026c26db94e1b1540114184`, fd)
      .then((res) => {
        props.setUrlLink({ ...props.urlLink, Link: res.data.fileLink });
        SetSelectedFile({ ...selectedFile, uploadSuccess: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(selectedFile);

  console.log("URL STATE", props.urlLink);
  return (
    <div className="uploadPageHero">
      <Container className="d-flex flex-column justify-content-center pt-5 pb-5">
        <Row className="">
          <Col>
            <h3>Hi Fatih,</h3>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {selectedFile.fileLink === null ? (
              <Image
                className="uploadImage"
                onClick={onButtonClick}
                src={grayBgUpload}
                fluid
              />
            ) : selectedFile.uploadSuccess !== true ? (
              <h4 style={{ color: "#007BFF" }}>
                File Selected: {selectedFile.fileName}
              </h4>
            ) : (
              <Image
                className="uploadImageUploaded"
                onClick={onButtonClick}
                src={grayBgUploadSuccess}
                fluid
              />
            )}

            {/* <input
              type="file"
              id="imgupload"
              name="upload"
              style={{ display: "none" }}
            /> */}
            <input
              type="file"
              name="upload"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
            <p>*Maximum upload file size: 5 MB.</p>
          </Col>
        </Row>

        <Row className=" mt-4">
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  QR Title
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handlerChangeText}
                placeholder="optional"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className=" mt-3">
          <Col xs={12}>
            <Button
              onClick={handleUpload}
              className=" mr-2"
              size="lg"
              variant="success"
            >
              Upload
            </Button>{" "}
            <Button
              as={Link}
              to="/user/qrcode"
              className=" mr-2"
              size="lg"
              variant="primary"
            >
              QR code
            </Button>{" "}
            <Button size="lg" variant="danger">
              Delete
            </Button>{" "}
          </Col>
          {/* <Col xs={5}>
            
          </Col>
          <Col xs={4}>
            
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default UploadPage;
