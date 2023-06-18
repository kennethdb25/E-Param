import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Table,
  Tabs,
  Button,
  Popconfirm,
  message,
  Modal,
  Row,
  Col,
  Input,
  Space,
  Image,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { LoginContext } from "../../../Context/Context";
import "./style.css";
import "antd/dist/antd.min.css";

const { TextArea } = Input;
const { Title } = Typography;

const AvailableBooks = (props) => {
  const { genre, setCurrentActive, getAddShelfPerStudent } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState(genre[0]);


  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const addToShelfText = "Are you sure to reserve this Book?";

  const onConfirmReserve = async (e, record) => {
    e.defaultPrevented = true;
    record.studentId = loginData.validUser.studentId;
    record.firstName = loginData.validUser.firstName;
    record.middleName = loginData.validUser.middleName;
    record.lastName = loginData.validUser.lastName;
    record.grade = loginData.validUser.grade;
    record.section = loginData.validUser.section;
    record.email = loginData.validUser.email;

    const data = await fetch("/book/add-shelf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    const res = await data.json();
    if (res.status === 201) {
      getAddShelfPerStudent();
      message.success("Reservation Added to Shelf");
      setCurrentActive(4);
    }
  };

  const onChange = (key) => {
    setActiveTab(genre[key - 1]);
  };

  const onViewDetails = async (record, e) => {
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
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "10%",
      ...getColumnSearchProps("genre"),
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
            {loginData.validUser.userType === "Student" ? (
              <>
                <Popconfirm
                  placement="top"
                  title={addToShelfText}
                  onConfirm={(e) => onConfirmReserve(e, record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Add to Shelf</Button>
                </Popconfirm>
              </>
            ) : null}
            <Button
              onClick={(e) => {
                onViewDetails(record, e);
              }}
            >
              View Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab && !tabData[activeTab]) {
        try {
          const response = await fetch(
            `/book/get-all-book-per-genre?genre=${activeTab}`
          );
          const data = await response.json();
          setTabData((prevData) => ({
            ...prevData,
            [activeTab]: data,
          }));
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    };
    fetchData();
  }, [activeTab, tabData]);

  useEffect(() => {
    fetch(`/uploads/${loginData?.validUser.imgpath}`)
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
            <span className="las la-bars">Available Books</span>
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
        <Tabs
          onChange={onChange}
          type="card"
          items={genre.map((bookName, index) => {
            const id = String(index + 1);
            return {
              label: `${bookName}`,
              key: id,
              children: <h1 key={id}>{`${bookName}`}</h1>,
            };
          })}
        />
        <Table
          key="AvailableBook"
          columns={columns}
          dataSource={tabData[activeTab]}
        />
      </main>
      {/* ViewDetails Modal */}
      <div className="modals">
        <Modal
          key="BookDetailsAvailable"
          title="Book Details"
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

export default AvailableBooks;
