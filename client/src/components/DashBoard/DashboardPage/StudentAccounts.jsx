import React, { useContext, useRef, useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { LoginContext } from "../../../Context/Context";
import {
  Button,
  Modal,
  Table,
  Form,
  Row,
  Col,
  Image,
  Typography,
  Input,
  Space,
  message,
  Divider,
} from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  RollbackOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";
import "antd/dist/antd.min.css";

const { Text } = Typography;

const StudentAccounts = (props) => {
  const [form] = Form.useForm();
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [printId, setPrintId] = useState(false);
  const [pedningImg, setPendingImg] = useState();
  const [viewData, setViewData] = useState();
  const [isView, setIsView] = useState(false);
  const [studentBookHistory, setStudentBookHistory] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  const { studentAccount, getStudentAccounts, handleLogout } = props;

  const ViewRecord = async (record) => {
    fetch(`/uploads/${record.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setPendingImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setIsView(true);
    setViewData(record);
  };
  const handleCancel = async () => {
    form.resetFields();
    setIsView(false);
  };

  const handlePrint = () => {
    setPrintId(true);
    setTimeout(() => {
      window.resizeTo(1200, 1000);
      window.print();
    }, 1000);
  };

  const handpleApprove = async () => {
    const data = await fetch(`/student/approve/${viewData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      message.success("Account Approved Successfully");
      form.resetFields();
      getStudentAccounts();
      setIsView(false);
    }
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

  const columns = [
    {
      title: "Library Card No.",
      dataIndex: "libraryCardNum",
      key: "libraryCardNum",
      width: "10%",
      ...getColumnSearchProps("libraryCardNum"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
      width: "10%",
      ...getColumnSearchProps("middleName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      width: "10%",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      width: "5%",
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      width: "5%",
    },
    {
      title: "Status",
      dataIndex: "acctStatus",
      key: "acctStatus",
      width: "10%",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Pending",
          value: "Pending",
        },
      ],
      onFilter: (value, record) => record.acctStatus.indexOf(value) === 0,
    },
    {
      title:"",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              key="view"
              icon={<ReadOutlined />}
              type="primary"
              onClick={() => {
                ViewRecord(record);
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

  const initialValues = {
    acctStatus: viewData?.acctStatus,
  };

  useEffect(() => {
    if (loginData) {
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
    }
  }, [loginData]);

  const historyColumns = [
    {
      title: "Library Card No.",
      dataIndex: "libraryCardNum",
      key: "libraryCardNum",
      width: "10%",
      ...getColumnSearchProps("libraryCardNum"),
    },
    {
      title: "Borrower's First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
    },
    {
      title: "Borrower's Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "15%",
    },
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "10%",
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      width: "15%",
      render: (record) => new Date(record).toLocaleString(),
    },
    {
      title: "Penalty",
      dataIndex: ["lostPenalty", "status"],
      key: "lostPenalty",
      width: "20%",
      render: (text, row) => (
        // (record) => <>{new Date(record).toLocaleString()}</>,
        <>
          {row["status"] === "Lost"
            ? `Php ${row["lostPenalty"]}.00`
            : ""}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      filters: [
        {
          text: "Borrowed",
          value: "Borrowed",
        },
        {
          text: "Returned",
          value: "Returned",
        },
        {
          text: "Lost",
          value: "Lost",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title:
        loginData.validUser?.userType === "Super Admin" ||
        loginData.validUser?.userType === "Librarian" ? (
          <>
            <div>
              <Button
                // disabled={notifButton}
                type="primary"
                shape="round"
                onClick={() => handleLibraryScan()}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
              >
                VALIDATE USER RECORD
              </Button>
            </div>
          </>
        ) : (
          ""
        ),
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              key="view"
              icon={<ReadOutlined />}
              type="primary"
              // onClick={() => {
              //   ViewRecord(record);
              // }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              View Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const handleLibraryScan = () => {
    setScannerOpen(true);
    setHistoryModal(true);
  };
  const onCancelProcess = () => {
    setScannerOpen(false);
    setHistoryModal(false);
    setStudentBookHistory("");
  };

  useEffect(() => {
    if (scannerOpen) {
      const scanner = new Html5QrcodeScanner("reader-library", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(successReadLibraryCard, errorReadLibraryCard);

      function successReadLibraryCard(result) {
        scanner.clear();
        setScannerOpen(false);
        setHistoryModal(false);
        bookHistory(result);
      }

      function errorReadLibraryCard(error) {
        // scanner.clear();
        console.error(error);
      }
    }
  }, [scannerOpen]);

  const bookHistory = async (studentId) => {
    const data = await fetch(
      `/book/student-borrow-history?studentId=${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    setStudentBookHistory(res.body);
  };

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
              Accounts
            </span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img src={img} width="40px" height="40px" alt="" />
          <div>
            <h4>{`${loginData?.validUser.firstName} ${loginData?.validUser.lastName}`}</h4>
            <small>{`${loginData?.validUser.userType}`}</small>
          </div>
          {loginData.validUser?.userType === "Super Admin" ||
          loginData.validUser?.userType === "Librarian" ? (
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
        <Table
          key="StudentAccounts"
          columns={columns}
          dataSource={studentAccount.body}
        />
        <Divider orientation="left" orientationMargin="0">
          <h3>BORROWED HISTORY</h3>
        </Divider>
        <Table
          key="bookHistory"
          columns={historyColumns}
          dataSource={studentBookHistory}
        />
      </main>

      {/* BOOK HISTORY MODAL */}
      <Modal
        title="Scan Library Card"
        width={420}
        open={historyModal}
        onCancel={onCancelProcess}
        footer={[
          <Button
            icon={<RollbackOutlined />}
            type="primary"
            onClick={onCancelProcess}
          >
            Cancel
          </Button>,
        ]}
      >
        <Row>
          <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Row gutter={12} style={{ gap: "20px" }}>
              <div
                id="reader-library"
                style={{ height: 400, width: 400 }}
              ></div>
            </Row>
          </Col>
        </Row>
      </Modal>

      {/* LIBRARY CARD AND ACCOUNT DETAILS MODAL */}
      <Modal
        title={printId ? "Library Card" : "Account Details"}
        width={1600}
        open={isView}
        onCancel={() => {
          setIsView(false);
        }}
        footer={[
          <div className="no-print">
            {viewData ? (
              <>
                {viewData.acctStatus === "Pending" ? (
                  <Button
                    icon={<CheckCircleOutlined />}
                    type="primary"
                    key="approve"
                    onClick={handpleApprove}
                  >
                    Approve Account
                  </Button>
                ) : null}
              </>
            ) : null}
            <Button
              icon={<PrinterOutlined />}
              type="primary"
              key="print"
              onClick={handlePrint}
            >
              Print Library Card
            </Button>
            <Button
              key="cancel"
              type="primary"
              icon={<RollbackOutlined />}
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </Button>
          </div>,
        ]}
      >
        {viewData ? (
          <>
            <div className="custom-modal">
              <Form
                form={form}
                labelCol={{
                  span: 24,
                }}
                initialValues={initialValues}
                layout="horizontal"
                autoComplete="off"
                style={{
                  width: "100%",
                  maxHeight: "100vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: 40,
                  }}
                >
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                    }}
                  >
                    {`Library Card #: ${viewData?.libraryCardNum}`}
                  </Typography.Title>
                  <Typography.Title
                    level={3}
                    style={{
                      margin: 0,
                    }}
                  >
                    PAMPANGA HIGH SCHOOL LIBRARY
                  </Typography.Title>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                    }}
                  >
                    PHS Blvd. Brgy. Lourdes, CSFP 2000
                  </Typography.Title>
                </div>
                <Row>
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 8 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Row gutter={12}>
                      <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                        <Form.Item label="ID Picture">
                          <Image width={200} height={200} src={pedningImg} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={12}>
                      <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                        <Form.Item label="QR Code">
                          <Image
                            width={200}
                            height={200}
                            src={viewData.QRCode}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Row gutter={6}>
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        layout="horizontal"
                      >
                        <Form.Item label="Student ID" name="studentId">
                          <Typography.Title
                            level={5}
                            style={{
                              margin: 0,
                              width: "100%",
                            }}
                          >
                            {viewData.studentId}
                          </Typography.Title>
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        layout="horizontal"
                      >
                        <Form.Item label="Name" name="name">
                          <Typography.Title
                            level={5}
                            style={{
                              margin: 0,
                              width: "100%",
                            }}
                          >
                            {`${viewData.lastName}, ${viewData.firstName} ${viewData.middleName}`}
                          </Typography.Title>
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        layout="horizontal"
                      >
                        <Form.Item label="Grade and Section" name="grade&sec">
                          <Typography.Title
                            level={5}
                            style={{
                              margin: 0,
                              width: "100%",
                            }}
                          >
                            {`${viewData.grade} - ${viewData.section}`}
                          </Typography.Title>
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        layout="horizontal"
                      >
                        <Form.Item label="Expiry Date" name="gender">
                          <Typography.Title
                            level={5}
                            style={{
                              margin: 0,
                              width: "100%",
                            }}
                          >
                            {`August ${new Date().getFullYear()} - June ${
                              new Date().getFullYear() + 1
                            }`}
                          </Typography.Title>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Row gutter={6}>
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        layout="horizontal"
                      >
                        <table border="1">
                          <tr>
                            <th style={{ width: "100px" }}>Call. No</th>
                            <th style={{ width: "100px" }}>Acc. No.</th>
                            <th style={{ width: "120px" }}>Due Date</th>
                            <th style={{ width: "140px" }}>Returned Date</th>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </table>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        layout="horizontal"
                      >
                        <Form.Item label="Authorized by:">
                          <Typography.Title
                            level={5}
                            style={{
                              marginTop: 20,
                              width: "100%",
                            }}
                          >
                            <Text
                              underline
                            >{` ${loginData?.validUser.lastName}, ${loginData?.validUser.firstName} ${loginData?.validUser.middleName}`}</Text>
                          </Typography.Title>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <h3>INSTRUCTIONS</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "25%",
                      }}
                    >
                      <Typography.Text
                        level={5}
                        style={{
                          marginTop: 20,
                          width: "100%",
                        }}
                      >
                        1. This Library is non-transferable and must be
                        presented with ID card when borrowing or returning
                        books.
                      </Typography.Text>
                      <Typography.Text
                        level={5}
                        style={{
                          marginTop: 20,
                          width: "100%",
                        }}
                      >
                        2. Replacement for filled-up card is free. A fine of
                        P5.00 is charged for a lost card.
                      </Typography.Text>
                      <Typography.Text
                        level={5}
                        style={{
                          marginTop: 20,
                          width: "100%",
                        }}
                      >
                        3. Lost card should be reported to the librarian and a
                        replacement is issued a week after the report of loss.
                      </Typography.Text>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default StudentAccounts;
