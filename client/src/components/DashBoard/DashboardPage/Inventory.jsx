import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import axios from "axios";
import { Table, Button, Modal, message, Upload } from "antd";
import { Card, CardContent, Container, Grid, TextField } from "@mui/material";
import { PlusCircleOutlined, InboxOutlined } from "@ant-design/icons";
import useStyles from "./styles";
import "./style.css";
import "antd/dist/antd.min.css";

const { Dragger } = Upload;

const Inventory = () => {
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [qrDetail, setQrDetail] = useState("");
  const [qrImage, setQrImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [singleOpen, setSingleOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const classes = useStyles();

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleDownload = () => {
    setQrDetail("");
    setQrImage();
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleSingleModal = () => {
    setIsOpen(false);
    setSingleOpen(true);
  };

  const handleBatchModal = () => {
    setIsOpen(false);
    setBatchOpen(true);
  };

  const generateQrCode = async (e) => {
    e.preventDefault();
    axios
      .post("/librarian/scannerQrCode", { detail: qrDetail })
      .then((response) => {
        console.log(response);
        setQrImage(response.data);
      });
  };

  const dataSource = [
    {
      key: "1",
      bookName: "Mike",
      author: "John Doe",
      isbn: 123123134323,
      status: "Returned",
    },
    {
      key: "2",
      bookName: "Mike",
      author: "John Doe",
      isbn: 203453453408,
      status: "Returned",
    },
  ];

  const columns = [
    {
      title: "Book Name",
      dataIndex: "bookName",
      key: "bookName",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: (
        <>
          {loginData?.validUser?.userType === "Librarian" ||
          loginData?.validUser?.userType === "Super Admin" ? (
            <>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                onClick={() => handleOpenModal()}
              >
                ADD BOOK
              </Button>
            </>
          ) : null}
        </>
      ),
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button>View Details</Button>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetch(`/uploads/${loginData?.validUser?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
  });

  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span className="las la-bars">Inventory</span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img src={img} width="40px" height="40px" alt="" />
          <div>
            <h4>{`${loginData?.validUser.firstName} ${loginData?.validUser.lastName}`}</h4>
            <small>{`${loginData?.validUser.userType}`}</small>
          </div>
        </div>
      </header>
      <main>
        <div className="inventory-grid">
          <div className="projects">
            <h3>Inventory</h3>
            <Table columns={columns} dataSource={dataSource} />
          </div>
          <div className="customers">
            <h3>Generate and Download QR Code</h3>
            <Container>
              <Card>
                <CardContent className={classes.cardContent}>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.gridContent}
                  >
                    {qrDetail.length > 0 && qrImage ? (
                      <>
                        <a
                          className={classes.gridContent}
                          href={qrImage}
                          download
                          onClick={handleDownload}
                        >
                          <h5>Pampanga High School Library</h5>
                          <img src={qrImage} alt="qrImage" />
                        </a>
                      </>
                    ) : null}
                    <br />
                    <br />
                    <TextField
                      label="Enter Book ISBN here"
                      onChange={(e) => setQrDetail(e.target.value)}
                      value={qrDetail}
                    />
                    <Button
                      className={classes.btn}
                      shape="round"
                      type="primary"
                      onClick={generateQrCode}
                    >
                      Generate QR Code
                    </Button>
                    <br />
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          </div>
        </div>
      </main>
      <div className="modals">
        <Modal
          title="ADD BOOKS"
          width={400}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button onClick={() => handleSingleModal()}>Single Add</Button>
            <Button onClick={() => handleBatchModal()}>Batch Add</Button>
          </div>
        </Modal>

        <Modal
          title="ADD SINGLE BOOK"
          width={1000}
          open={singleOpen}
          onCancel={() => setSingleOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setSingleOpen(false)}>
              Cancel
            </Button>,
          ]}
        >
          <div>
            <Button>Single Add</Button>
            <Button>Batch Add</Button>
          </div>
        </Modal>

        <Modal
          title="ADD BATCH BOOK"
          width={400}
          open={batchOpen}
          onCancel={() => setBatchOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setBatchOpen(false)}>
              Cancel
            </Button>,
          ]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Modal>
      </div>
    </>
  );
};

export default Inventory;
