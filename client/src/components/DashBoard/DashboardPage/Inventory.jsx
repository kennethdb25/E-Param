import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import axios from "axios";
import { Table, Button } from "antd";
import { Card, CardContent, Container, Grid, TextField } from "@mui/material";
import { PlusCircleOutlined } from "@ant-design/icons";
import useStyles from "./styles";
import "./style.css";
import "antd/dist/antd.min.css";

const Inventory = () => {
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [qrDetail, setQrDetail] = useState("");
  const [qrImage, setQrImage] = useState();
  const classes = useStyles();

  const handleDownload = () => {
    setQrDetail("");
    setQrImage();
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
                        <a href={qrImage} download onClick={handleDownload}>
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
    </>
  );
};

export default Inventory;
