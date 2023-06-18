import React, { useContext, useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { LoginContext } from "../../../Context/Context";
import {
  Table,
  Button,
  Modal,
  Row,
  Col,
  message,
  Typography,
  Input,
  Image,
} from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const { TextArea } = Input;
const { Title } = Typography;

const Shelf = (props) => {
  const { getAddToShelf, paginationStudentShelf, getInventoryData } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [processModal, setProcessModal] = useState(false);
  const [studentInfo, setStudentInfo] = useState("");
  const [bookInfo, setBookInfo] = useState("");
  const [studentResult, setStudentResult] = useState("");
  const [bookResult, setBookResult] = useState("");
  const [recordedData, setRecordedData] = useState();
  const [libraryButton, setLibraryButton] = useState(false);
  const [bookButton, setBookButton] = useState(false);
  const [validateButton, setValidateButton] = useState(false);
  const [processButton, setProcessButton] = useState(true);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerBook, setScannerBook] = useState(false);
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [enableBookScanBtn, setEnableBookScanBtn] = useState(true);

  const handleLibraryScan = () => {
    setScannerOpen(true);
    setLibraryButton(true);
  };

  const handleBookScan = () => {
    if (enableBookScanBtn === true) {
      return message.warn("Please scan library card first");
    } else {
      setScannerBook(true);
      setBookButton(true);
    }
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
        setStudentResult(result);
        scanner.clear();
        setScannerOpen(false);
        setEnableBookScanBtn(false);
        fetchStudentData(result);
      }

      function errorReadLibraryCard(error) {
        // scanner.clear();
        console.error(error);
      }
    }
  }, [scannerOpen]);

  const fetchStudentData = async (studentId) => {
    const data = await fetch(`/student/get-info?studentId=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setStudentInfo(res.body);
  };

  useEffect(() => {
    if (scannerBook) {
      const scanner = new Html5QrcodeScanner("reader-book", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(successReadLibraryCard, errorReadLibraryCard);

      function successReadLibraryCard(result) {
        setBookResult(result);
        scanner.clear();
        setScannerBook(false);
        fetchBookData(result);
      }

      function errorReadLibraryCard(error) {
        // scanner.clear();
        console.error(error);
      }
    }
  }, [scannerBook]);

  const fetchBookData = async (isbn) => {
    const data = await fetch(`/book/get-info?isbn=${isbn}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setBookInfo(res.body);
  };

  const handleProcess = (e, record) => {
    e.defaultPrevented = true;
    console.log(record);
    setRecordedData(record);
    setProcessModal(true);
  };

  const onFinish = () => {
    if (
      studentInfo.studentId === recordedData.studentId &&
      bookInfo.isbn === recordedData.isbn
    ) {
      message.success("Data Matched");
      setValidateButton(true);
      setProcessButton(false);
    } else {
      message.warn("Please scan the QR Code or Validation Failed");
    }
  };

  const onProcessProceed = async () => {
    const processData = await fetch("/book/add-borrowed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordedData),
    });
    const res = await processData.json();
    if (res.status === 201) {
      getInventoryData();
      message.success("Process Succeeded");
      setProcessModal(false);
      setStudentInfo("");
      setBookInfo("");
      setStudentResult("");
      setRecordedData();
      setLibraryButton(false);
      setBookButton(false);
      setValidateButton(false);
      setScannerOpen(false);
      setScannerBook(false);
      setProcessButton(true);
      setEnableBookScanBtn(true);
    }
  };

  const onCancelProcess = () => {
    setProcessModal(false);
    setStudentInfo("");
    setBookInfo("");
    setStudentResult("");
    setRecordedData();
    setLibraryButton(false);
    setBookButton(false);
    setValidateButton(false);
    setScannerOpen(false);
    setScannerBook(false);
    setProcessButton(true);
    setEnableBookScanBtn(true);
  };

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

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "15%",
      // ...getColumnSearchProps("firstName"),
    },
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "15%",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "20%",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "10%",
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
            {loginData.validUser.userType !== "Student" ? (
              <>
                <Button onClick={(e) => handleProcess(e, record)}>
                  Process
                </Button>
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
            <span className="las la-bars">Shelf Item(s)</span>
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
          key="ShelfBook"
          columns={columns}
          dataSource={getAddToShelf}
          pagination={paginationStudentShelf}
        />
      </main>

      {/* Process Modal */}
      <Modal
        key="ProcessModal"
        title="Processing"
        width={1200}
        open={processModal}
        onCancel={onCancelProcess}
        footer={[
          <Button hidden={processButton} onClick={onProcessProceed}>
            Process
          </Button>,
          <Button onClick={onCancelProcess}>Cancel</Button>,
        ]}
      >
        <h1>Student Info</h1>
        <Row>
          <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Row gutter={12} style={{ marginBottom: "20px" }}>
              <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => handleLibraryScan()}
                    hidden={libraryButton}
                  >
                    Scan Library Card
                  </Button>
                  <div
                    id="reader-library"
                    style={{ height: 400, width: 400 }}
                  ></div>
                </div>
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Student ID
                </Title>
                <Input value={studentInfo?.studentId} readOnly />
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  First Name
                </Title>
                <Input value={studentInfo?.firstName} readOnly />
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Middle Name
                </Title>
                <Input value={studentInfo?.middleName} readOnly />
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Last Name
                </Title>
                <Input value={studentInfo?.lastName} readOnly />
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Email
                </Title>
                <Input value={studentInfo?.email} readOnly />
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Grade
                </Title>
                <Input value={studentInfo?.grade} readOnly />
              </Col>
              <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
                <Title
                  level={5}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Section
                </Title>
                <Input value={studentInfo?.section} readOnly />
              </Col>
            </Row>
          </Col>
        </Row>
        <h1>Book Info</h1>
        <Row gutter={12}>
          <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => handleBookScan()} hidden={bookButton}>
                Scan Book QR Code
              </Button>
              <div id="reader-book" style={{ height: 400, width: 400 }}></div>
            </div>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              ISBN
            </Title>
            <Input value={bookInfo?.isbn} readOnly />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              Book Name
            </Title>
            <Input value={bookInfo?.title} readOnly />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              Author Name
            </Title>
            <Input value={bookInfo?.author} readOnly />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              Location
            </Title>
            <Input value={bookInfo?.location} readOnly />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              Publication
            </Title>
            <Input value={bookInfo?.publication} readOnly />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              Accession Number
            </Title>
            <Input value={bookInfo?.assession} readOnly />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
            <Title
              level={5}
              style={{
                marginTop: "20px",
              }}
            >
              Genre
            </Title>
            <Input value={bookInfo?.genre} readOnly />
          </Col>
        </Row>
        <Row
          gutter={12}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          {bookResult && studentResult ? (
            <>
              <Button
                type="primary"
                htmlType="submit"
                hidden={validateButton}
                onClick={() =>
                  fetchBookData(bookResult) &&
                  fetchStudentData(studentResult) &&
                  onFinish()
                }
              >
                Validate
              </Button>
            </>
          ) : null}
        </Row>
      </Modal>

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
                    Date Reserved
                  </Title>
                  <Input value={new Date(viewDetailsData?.dateReserved)} readOnly />
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

export default Shelf;
