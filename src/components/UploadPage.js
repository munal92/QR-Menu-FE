import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
  Form,
} from "react-bootstrap";
import grayBg from "../img/graybg.png";
import grayBgUpload from "../img/graybgupload.jpg";
import grayBgUploadSuccess from "../img/graybgUploadSuccess.png";
import Spin from "./Spin";
const UploadPage = (props) => {
  /// for <input> tag
  const inputFile = useRef(null);
  const [selectedFile, SetSelectedFile] = useState({
    fileName: "",
    fileLink: "null",
    uploadSuccess: false,
    userAlert: "*Maximum upload .pdf file size: 5 MB.",
  });
  const history = useHistory();

  useEffect(() => {
    const email = window.localStorage.getItem("userEmail");

    axiosWithAuth()
      .post("/api/user/find", { email: email })
      .then((res) => {
        props.setUrlLink({
          ...props.urlLink,
          name: res.data.name,
          email: res.data.email,
          id: res.data._id,
          Link: res.data.fileLink,
          fileName: res.data.fileName,
        });
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.clear();
        history.push("/");
      });
  }, []);
  const [show, setShow] = useState(false);

  const onButtonClick = () => {
    inputFile.current.click();
  };
  const handleChangeFile = (e) => {
    e.persist();

    SetSelectedFile({
      ...selectedFile,
      fileLink: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };
  const handlerChangeText = (e) => {
    e.persist();
    props.setUrlLink({ ...props.urlLink, title: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setShow(true);
    const fd = new FormData();
    fd.append("upload", selectedFile.fileLink);
    fd.append("fileName", selectedFile.fileName);

    axiosWithAuth()
      .put(`/api/user/addinfo/${props.urlLink.id}`, fd)
      .then((res) => {
        props.setUrlLink({
          ...props.urlLink,
          fileName: res.data.fileName,
          Link: res.data.fileLink,
        });
        SetSelectedFile({ ...selectedFile, uploadSuccess: true });
        setShow(false);
      })
      .catch((err) => {
        SetSelectedFile({
          ...selectedFile,
          userAlert: "File could not be uploaded. File must be .pdf format",
        });
        setShow(false);
        console.log(err);
      });
  };

  const handleDeleteFile = (e) => {
    e.preventDefault();
    setShow(true);

    if (e.target.id === "removeSelection") {
      setShow(false);
      SetSelectedFile({
        ...selectedFile,
        fileName: "",
        fileLink: null,
        uploadSuccess: false,
        userAlert: "*Maximum upload .pdf file size: 5 MB.",
      });
      inputFile.current.value = null;
    } else {
      axiosWithAuth()
        .put(`/api/user/delfile/${props.urlLink.id}`, {
          fileLink: props.urlLink.Link,
        })
        .then((res) => {
          props.setUrlLink({
            ...props.urlLink,
            fileName: "",
            Link: "NONE",
          });
          setShow(false);
          SetSelectedFile({
            ...selectedFile,
            fileName: "",
            fileLink: null,
            uploadSuccess: false,
          });
        })
        .catch((err) => {
          console.log(err);
          setShow(false);
        });
    }
  };

  return (
    <div className="uploadPageHero">
      <Container className="d-flex flex-column justify-content-center pt-5 pb-5 ">
        <Row>
          <Col>
            <h3 style={{ color: "#01384d" }}>Hi {props.urlLink.name},</h3>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {props.urlLink.Link === "NONE" && selectedFile.fileName === "" ? (
              <Image
                className="uploadImage"
                onClick={onButtonClick}
                src={grayBgUpload}
                fluid
              />
            ) : props.urlLink.Link === "NONE" &&
              selectedFile.fileName !== "" ? (
              <Row>
                <Col md={7} xs={10}>
                  <h5 style={{ color: "#007BFF" }}>
                    File Selected: {selectedFile.fileName}
                  </h5>
                </Col>

                <Col md={5} xs={2}>
                  <i
                    style={{
                      color: "red",
                      alignSelf: "center",
                      cursor: "pointer",
                    }}
                    className="far fa-times-circle fa-lg mb-1"
                    id="removeSelection"
                    onClick={handleDeleteFile}
                  ></i>
                </Col>
              </Row>
            ) : selectedFile.uploadSuccess === true ? (
              <Image
                className="uploadImageUploaded"
                onClick={onButtonClick}
                src={grayBgUploadSuccess}
                fluid
              />
            ) : (
              <>
                <Row>
                  <Col md={7} xs={10} style={{ color: "#007BFF" }}>
                    <h5>Uploaded File: {props.urlLink.fileName}</h5>
                  </Col>

                  <Col md={5} xs={2}>
                    <i
                      style={{
                        color: "red",

                        cursor: "pointer",
                      }}
                      id="deleteFile"
                      className="far fa-trash-alt fa-lg"
                      onClick={handleDeleteFile}
                    ></i>
                  </Col>
                </Row>
              </>
            )}

            <input
              type="file"
              name="upload"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
            {selectedFile.userAlert ===
            "*Maximum upload .pdf file size: 5 MB." ? (
              <p>{selectedFile.userAlert}</p>
            ) : (
              <p style={{ color: "#df4759" }}>{selectedFile.userAlert}</p>
            )}
          </Col>
        </Row>

        <Row className=" mt-4">
          <Col sm={5}>
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
          {props.urlLink.Link !== "NONE" ? (
            <Col xs={12}>
              {" "}
              <Button
                onClick={handleUpload}
                className=" mr-2"
                size="md"
                variant="secondary"
                disabled
              >
                Upload
              </Button>{" "}
              <Button
                as={Link}
                to="/user/qrcode"
                className=" mr-2"
                size="md"
                variant="second"
              >
                QR code
              </Button>{" "}
            </Col>
          ) : (
            <Col xs={12}>
              {" "}
              <Button
                onClick={handleUpload}
                className=" mr-2"
                size="md"
                variant="first"
              >
                Upload
              </Button>
              <Button className=" mr-2" size="md" variant="secondary" disabled>
                QR code
              </Button>
            </Col>
          )}
        </Row>
      </Container>

      <Spin show={show} setShow={setShow} />
    </div>
  );
};

export default UploadPage;
