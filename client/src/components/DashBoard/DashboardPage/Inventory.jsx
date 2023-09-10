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
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Card, CardContent, Container, Grid, TextField } from "@mui/material";
import {
  PlusCircleOutlined,
  ReadOutlined,
  QrcodeOutlined,
  UndoOutlined,
  FileImageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { GiHamburgerMenu } from "react-icons/gi";
import useStyles from "./styles";
import "./style.css";
import "antd/dist/antd.min.css";
import {
  InventoryAddBookModal,
  InventoryAvailableBooksModal,
  InventoryBatchAddModal,
  InventoryForReviewAddImageModal,
  InventoryLostBooksModal,
} from "../AntdComponents/Modal/modal";
import {
  InventorySingleAddDrawer,
  InventoryUpdateBookDrawer,
} from "../AntdComponents/Drawer/drawer";

const Inventory = (props) => {
  const {
    getAvailable,
    paginationAvailable,
    lostBookCount,
    paginationAllLost,
    forReviewBook,
    paginationAllRevew,
    getInventoryData,
    handleLogout,
  } = props;
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
  const [updateOpen, setUpdateOpen] = useState(false);
  const [fileLists, setFileLists] = useState(null);
  const [forReviewOpen, setForReviewOpen] = useState(false);
  const [viewReviewData, setViewReviewData] = useState(null);

  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [viewDetailsLostModal, setViewDetailsLostModal] = useState(false);

  const classes = useStyles();
  const initialValues = {
    title: updateData?.title,
    author: updateData?.author,
    isbn: updateData?.isbn,
    assession: updateData?.assession,
    desc: updateData?.desc,
    publication: updateData?.publication,
    abstract: updateData?.abstract,
    location: updateData?.location,
    genre: updateData?.genre,
    notes: updateData?.notes,
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

  const getColumnSearchProps = (dataIndex, colName) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${colName}`}
          prefix={<SearchOutlined style={{ marginRight: "10px" }} />}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            borderRadius: "10px",
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
            icon={<UndoOutlined />}
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

  const onConfirmReview = () => {
    form.submit();
  };

  const onConfirmUpdate = () => {
    form.submit();
  };

  const onFinishUpdate = async (values) => {
    const data = await fetch(`/book-update-available/${viewDetailsData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const res = await data.json();
    if (res.status === 201) {
      message.success("Book Updated Successfully");
      onCloseUpdate();
      getInventoryData();
    }
  };

  const onFinishUpdateFailed = (error) => {
    console.error(error);
  };

  const handleUpdateModal = (data) => {
    setViewDetailsModal(false);
    setUpdateOpen(true);
    form.resetFields();
  };
  const onClose = () => {
    setSingleOpen(false);
    form.resetFields();
  };

  const onCloseUpdate = () => {
    setViewDetailsData(null);
    setUpdateOpen(false);
    form.resetFields();
  };

  const handleFileUpdloadReview = async (values) => {
    // console.log(file);
    const newdata = new FormData();
    newdata.append("photo", values.photo.file.originFileObj);

    const data = await fetch(`/book-update-review/${viewReviewData._id}`, {
      method: "PATCH",
      body: newdata,
    });
    const res = await data.json();
    if (res.status === 201) {
      message.success("Adding Image Success");
      getInventoryData();
      setForReviewOpen(false);
    }
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

  // handle deletetion of book
  const handleBookDelete = async () => {
    const data = await fetch(`/book-delete-available/${viewDetailsData._id}`, {
      method: "PATCH",
    });
    const res = await data.json();
    if (res.status === 201) {
      getInventoryData();
      message.success(res.body);
      setViewDetailsModal(false);
    }
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

  const onViewForReview = async (record, e) => {
    setForReviewOpen(true);
    e.defaultPrevented = true;
    setViewReviewData(record);
  };

  const onViewDetailsAvailable = async (record, e) => {
    setUpdateData(record);
    setViewDetailsData(record);
    e.defaultPrevented = true;
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

  const onViewDetailsLost = async (record, e) => {
    // e.defaultPrevented = true;
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
    setViewDetailsLostModal(true);
  };

  // Column Tables
  const columnsAvailable = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title", "Book Name"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author", "Author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn", "ISBN"),
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
      ...getColumnSearchProps("title", "Book Name"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author", "Author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn", "ISBN"),
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
              icon={<FileImageOutlined />}
              onClick={(e) => {
                onViewForReview(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              ADD IMAGE
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
      ...getColumnSearchProps("title", "Book Name"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author", "Author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn", "ISBN"),
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
                onViewDetailsLost(record, e);
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
    if (loginData) {
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
    }
  }, [loginData]);

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span
              className="las la-bars"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <GiHamburgerMenu style={{ cursor: "pointer" }} />
              Inventory
            </span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img src={img} width="40px" height="40px" alt="" />
          <div>
            <h4>{`${loginData?.validUser.firstName} ${loginData?.validUser.lastName}`}</h4>
            <small>{`${loginData?.validUser.userType}`}</small>
          </div>
          {loginData.validUser?.userType !== "Student" ? (
            <div
              onClick={() => handleLogout()}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
                marginLeft: "15px",
                color: "red",
              }}
            >
              <LogoutOutlined />
              <h3 style={{ margin: "0", color: "red" }}>Logout</h3>
            </div>
          ) : (
            <></>
          )}
        </div>
      </header>
      <main>
        <div className="inventory-grid">
          <div className="projects">
            <Divider orientation="left" orientationMargin="0">
              <h3>AVAILABLE BOOKS</h3>
            </Divider>
            <Table
              key="AvailableInventoryBook"
              columns={columnsAvailable}
              dataSource={getAvailable}
              pagination={paginationAvailable}
            />
          </div>
          <div className="customers">
            <Divider orientation="left" orientationMargin="0">
              <h3>Generate and Download QR Code</h3>
            </Divider>
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
        <Divider orientation="left" orientationMargin="0">
          <h3>FOR REVIEW</h3>
        </Divider>
        <Table
          key="ForReview"
          columns={columnsReview}
          dataSource={forReviewBook}
          pagination={paginationAllRevew}
        />
        <Divider orientation="left" orientationMargin="0">
          <h3>LOST BOOKS</h3>
        </Divider>
        <Table
          key="LostInventoryBook"
          columns={columnsLost}
          dataSource={lostBookCount}
          pagination={paginationAllLost}
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
          handleBookDelete={handleBookDelete}
          handleUpdateModal={handleUpdateModal}
          updateData={updateData}
        />
        <InventoryLostBooksModal
          viewDetailsLostModal={viewDetailsLostModal}
          setViewDetailsLostModal={setViewDetailsLostModal}
          setViewDetailsData={setViewDetailsData}
          setViewDeatailsImg={setViewDeatailsImg}
          viewDetailsData={viewDetailsData}
          viewDeatailsImg={viewDeatailsImg}
        />

        <InventoryUpdateBookDrawer
          onCloseUpdate={onCloseUpdate}
          updateOpen={updateOpen}
          form={form}
          onFinishUpdate={onFinishUpdate}
          onFinishUpdateFailed={onFinishUpdateFailed}
          imgprops={imgprops}
          onPreview={onPreview}
          initialValues={initialValues}
          onConfirmUpdate={onConfirmUpdate}
        />
        <InventoryForReviewAddImageModal
          forReviewOpen={forReviewOpen}
          setForReviewOpen={setForReviewOpen}
          fileLists={fileLists}
          handleFileUpdloadReview={handleFileUpdloadReview}
          handleFileRemove={handleFileRemove}
          imgprops={imgprops}
          onPreview={onPreview}
          form={form}
          onConfirmReview={onConfirmReview}
        />
      </div>
    </>
  );
};

export default Inventory;
