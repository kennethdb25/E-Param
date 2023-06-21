import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import axios from "axios";
import {
  Table,
  Button,
  message,
  Upload,
  Space,
  Form,
  Input,
  Image,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Card, CardContent, Container, Grid, TextField } from "@mui/material";
import {
  PlusCircleOutlined,
  ReadOutlined,
  QrcodeOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import useStyles from "./styles";
import "./style.css";
import "antd/dist/antd.min.css";
import {
  InventoryAddBookModal,
  InventoryAvailableBooksModal,
  InventoryBatchAddModal,
} from "../AntdComponents/Modal/modal";
import { InventorySingleAddDrawer } from "../AntdComponents/Drawer/drawer";

const Inventory = (props) => {
  const { getAvailable, paginationAvailable } = props;
  const [form] = Form.useForm();
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [qrDetail, setQrDetail] = useState("");
  const [qrImage, setQrImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [singleOpen, setSingleOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [fileLists, setFileLists] = useState(null);

  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsModal, setViewDetailsModal] = useState(false);

  const classes = useStyles();

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

  // TABLE SEARCH AND RESET
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Search
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
              confirm({
                closeDropdown: true,
              });
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : "white",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // GENERATE QR
  const generateQrCode = async (e) => {
    e.preventDefault();
    if (qrDetail) {
      axios
        .post("/librarian/scannerQrCode", { detail: qrDetail })
        .then((response) => {
          setQrImage(response.data);
        });
    } else {
      message.warn("Please enter the ISBN");
    }
  };

  const onClose = () => {
    setSingleOpen(false);
    form.resetFields();
  };

  // FORM FUNCTIONS
  const onFinish = async (values) => {
    const newdata = new FormData();
    newdata.append("photo", values.photo.file.originFileObj);
    newdata.append("abstract", values.abstract);
    newdata.append("assession", values.assession);
    newdata.append("desc", values.desc);
    newdata.append("genre", values.genre);
    newdata.append("isbn", values.isbn);
    newdata.append("location", values.location);
    newdata.append("notes", values.notes);
    newdata.append("publication", values.publication);
    newdata.append("title", values.title);
    newdata.append("author", values.author);

    const res = await fetch("/book/single-add", {
      method: "POST",
      body: newdata,
    });
    if (res.status === 201) {
      message.success("Book Added Successfully");
      onClose();
    }
  };

  const onFinishFailed = (error) => {
    console.error(error);
  };

  // METHOD FOR BATCH UPLOAD
  const handleFileUpload = async (file) => {
    if (file) {
      const newdata = new FormData();
      newdata.append("file", file.originFileObj);

      const res = await fetch("/book/batch-add", {
        method: "POST",
        body: newdata,
      });
      if (res.status === 201) {
        message.success("Batch Adding Completed");
        setBatchOpen(false);
      } else {
        message.error("Something went wrong. Please try again later");
      }
    }
  };

  const handleFileRemove = (fileList) => {
    setFileLists(fileList);
  };

  // IMAGE METHOD FOR SINGLE UPLOAD
  const imgprops = {
    beforeUpload: (file) => {
      const isIMG = file.type.startsWith("image");

      if (!isIMG) {
        message.error(`${file.name} is not an image`);
      }

      return isIMG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onViewDetailsAvailable = async (record, e) => {
    console.log(record);
    e.defaultPrevented = true;
    setViewDetailsData(record);
    fetch(`/uploads/${record?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setViewDeatailsImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setViewDetailsModal(true);
  };

  // Column Tables
  const columnsAvailable = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn"),
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
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
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
            <Button
              type="primary"
              icon={<ReadOutlined />}
              onClick={(e) => {
                onViewDetailsAvailable(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              View Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const columnsReview = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              type="primary"
              icon={<ReadOutlined />}
              onClick={(e) => {
                onViewDetailsAvailable(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              View Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const columnsLost = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              type="primary"
              icon={<ReadOutlined />}
              onClick={(e) => {
                onViewDetailsAvailable(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              View Details
            </Button>
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
            <h3>Available Books</h3>
            <Table
              key="AvailableInventoryBook"
              columns={columnsAvailable}
              dataSource={getAvailable}
              pagination={paginationAvailable}
            />
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
                    <h3>Pampanga High School Library</h3>
                    {qrDetail.length > 0 && qrImage ? (
                      <>
                        <a
                          className={classes.gridContent}
                          href={qrImage}
                          download
                          onClick={handleDownload}
                        >
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
                      icon={<QrcodeOutlined />}
                      shape="round"
                      type="primary"
                      onClick={generateQrCode}
                      style={{
                        backgroundColor: "#000080",
                        border: "1px solid #d9d9d9",
                      }}
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
        <h3>For Review</h3>
        <Table
          key="ForReview"
          columns={columnsReview}
          dataSource={getAvailable}
          pagination={paginationAvailable}
        />
        <h3>Lost Books</h3>
        <Table
          key="LostInventoryBook"
          columns={columnsLost}
          dataSource={getAvailable}
          pagination={paginationAvailable}
        />
      </main>
      <div className="modals">
        {/* MODAL FOR ADD BOOK */}
        <InventoryAddBookModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSingleModal={handleSingleModal}
          handleBatchModal={handleBatchModal}
        />
        {/* DRAWER FOR SINGLE ADD */}
        <InventorySingleAddDrawer
          onClose={onClose}
          singleOpen={singleOpen}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          imgprops={imgprops}
          onPreview={onPreview}
        />
        {/* MODAL FOR BATCH ADD */}
        <InventoryBatchAddModal
          batchOpen={batchOpen}
          setBatchOpen={setBatchOpen}
          fileLists={fileLists}
          handleFileUpload={handleFileUpload}
          handleFileRemove={handleFileRemove}
        />

        {/* MODAL FOR VIEW DETAILS AVAILABLE */}
        <InventoryAvailableBooksModal
          viewDetailsModal={viewDetailsModal}
          setViewDetailsModal={setViewDetailsModal}
          setViewDetailsData={setViewDetailsData}
          setViewDeatailsImg={setViewDeatailsImg}
          viewDetailsData={viewDetailsData}
          viewDeatailsImg={viewDeatailsImg}
        />
      </div>
    </>
  );
};

export default Inventory;
