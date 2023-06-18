import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import {
  Table,
  Button,
  Modal,
  Row,
  Col,
  Space,
  Typography,
  Input,
  Image,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./style.css";
import "antd/dist/antd.min.css";

const { TextArea } = Input;
const { Title } = Typography;

const BorrowedBooks = (props) => {
  const { getBorrowedStudent, paginationStudentBorrowed } =
    props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);

  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const onViewDetails = async (record, e) => {
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
              clearFilters &&
              handleReset(clearFilters)
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

  const columns = [
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
      width: "10%",
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
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
            onClick={(e) => {
              onViewDetails(record, e);
            }}
            >View Details</Button>
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
            <span className="las la-bars">Borrowed Books</span>
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
        <Table
          key="BorrowedBook"
          columns={columns}
          dataSource={getBorrowedStudent}
          pagination={paginationStudentBorrowed}
        />
      </main>
      {/* ViewDetails Modal */}
      <div className="modals">
        <Modal
          key="BookDetailsAvailable"
          title="Reservation Details"
          width={1200}
          open={viewDetailsModal}
          onCancel={() => {
            setViewDetailsModal(false);
            setViewDetailsData();
            setViewDeatailsImg();
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setViewDetailsModal(false);
                setViewDeatailsImg();
                setViewDetailsData();
              }}
            >
              Cancel
            </Button>,
          ]}
        >
          <Row>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              <h1>Student Info</h1>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    First Name
                  </Title>
                  <Input value={viewDetailsData?.firstName} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Middle Name
                  </Title>
                  <Input value={viewDetailsData?.middleName} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Last Name
                  </Title>
                  <Input value={viewDetailsData?.lastName} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Student ID
                  </Title>
                  <Input value={viewDetailsData?.studentId} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Grade
                  </Title>
                  <Input value={viewDetailsData?.grade} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Section
                  </Title>
                  <Input value={viewDetailsData?.section} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Email
                  </Title>
                  <Input value={viewDetailsData?.email} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Status
                  </Title>
                  <Input value={viewDetailsData?.status} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Date Borrowed
                  </Title>
                  <Input value={new Date(viewDetailsData?.dateBorrowed)} readOnly />
                </Col>
              </Row>
              <h1
                style={{
                  marginTop: "30px",
                }}
              >
                Book Info
              </h1>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Book Name
                  </Title>
                  <Input value={viewDetailsData?.title} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Author Name
                  </Title>
                  <Input value={viewDetailsData?.author} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    ISBN
                  </Title>
                  <Input value={viewDetailsData?.isbn} readOnly />
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Accession Number
                  </Title>
                  <Input value={viewDetailsData?.assession} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Description
                  </Title>
                  <Input value={viewDetailsData?.desc} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Publication
                  </Title>
                  <Input value={viewDetailsData?.publication} readOnly />
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Abstract
                  </Title>
                  <TextArea
                    rows={10}
                    maxLength={3000}
                    showCount
                    placeholder="Enter abstract"
                    value={viewDetailsData?.abstract}
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Location
                  </Title>
                  <Input value={viewDetailsData?.location} readOnly />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Genre
                  </Title>
                  <Input value={viewDetailsData?.genre} readOnly />
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Book Image
                  </Title>
                  <Image src={viewDeatailsImg} alt="Book Details" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Notes
                  </Title>
                  <TextArea
                    rows={3}
                    maxLength={500}
                    showCount
                    placeholder="Enter Notes"
                    value={viewDetailsData?.notes}
                    readOnly
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
};

export default BorrowedBooks;
