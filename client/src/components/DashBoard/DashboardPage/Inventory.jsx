import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  message,
  Upload,
  Space,
  Drawer,
  Form,
  Row,
  Col,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Card, CardContent, Container, Grid, TextField } from "@mui/material";
import {
  PlusCircleOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import useStyles from "./styles";
import "./style.css";
import "antd/dist/antd.min.css";

const { Dragger } = Upload;
const { TextArea } = Input;

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

  const columnsShelf = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "15%",
      ...getColumnSearchProps("studentId"),
    },
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
      width: "15%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "20%",
      ...getColumnSearchProps("location"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "15%",
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
        <h3>For Review</h3>
        <Table
          key="ForReview"
          columns={columnsAvailable}
          dataSource={dataSource}
        />
        <h3>Lost Books</h3>
        <Table
          key="LostInventoryBook"
          columns={columnsAvailable}
          dataSource={dataSource}
        />
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
        {/* DRAWER FOR SINGLE ADD */}
        <Drawer
          title="Add Book"
          placement="right"
          onClose={onClose}
          open={singleOpen}
          height="100%"
          width="100%"
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "342px",
          }}
          extra={<Space></Space>}
        >
          <div className="custom-form">
            <Form
              form={form}
              labelCol={{
                span: 12,
              }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="Book Name"
                        name="title"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input book name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter book name" />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="Author Name"
                        name="author"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input author name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter author name" />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="ISBN"
                        name="isbn"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input ISBN!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter ISBN" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="Assession Number"
                        name="assession"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input assession number!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter assession number" />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="Description"
                        name="desc"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input description!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter description" />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="Publication"
                        name="publication"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input publication!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter publication" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
                      <Form.Item
                        label="Abstract"
                        name="abstract"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input abstract!",
                          },
                        ]}
                      >
                        <TextArea
                          rows={10}
                          maxLength={3000}
                          showCount
                          placeholder="Enter abstract"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                      <Form.Item
                        label="Location"
                        name="location"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input location!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter location" />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item
                        label="Genre"
                        name="genre"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input genre!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter book genre" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Form.Item
                        label="Book Image"
                        name="photo"
                        labelCol={{
                          span: 24,
                          //offset: 2
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please upload an image",
                          },
                        ]}
                      >
                        <Upload
                          {...imgprops}
                          listType="picture-card"
                          maxCount={1}
                          onPreview={onPreview}
                        >
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                      <Form.Item
                        label="Notes"
                        name="notes"
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input notes!",
                          },
                        ]}
                      >
                        <TextArea
                          rows={3}
                          maxLength={500}
                          showCount
                          placeholder="Enter Notes"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row
                    gutter={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button type="primary" onClick={onClose}>
                      Cancel
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        </Drawer>
        {/* MODAL FOR BATCH ADD */}
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
          <Dragger
            name="file"
            multiple={false}
            fileList={fileLists}
            beforeUpload={() => false}
            onChange={(info) => {
              handleFileUpload(info.fileList[0]);
              handleFileRemove(fileLists);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibited from uploading
              file not supported by the given format.
            </p>
          </Dragger>
        </Modal>
      </div>
    </>
  );
};

export default Inventory;
