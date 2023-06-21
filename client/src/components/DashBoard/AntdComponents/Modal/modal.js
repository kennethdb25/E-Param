import {
  Button,
  Modal,
  Upload,
  Typography,
  Row,
  Col,
  Input,
  Image,
  Popconfirm,
} from "antd";
import {
  InboxOutlined,
  RollbackOutlined,
  EditOutlined,
  QuestionOutlined,
  ScanOutlined,
  CheckOutlined,
  DeleteOutlined,
  FormOutlined
} from "@ant-design/icons";

const { Dragger } = Upload;
const { Title } = Typography;
const { TextArea } = Input;

/* AVAILABLEBOOKS PAGE */
export const AvailableBooksDetailsModal = (props) => {
  const {
    viewDetailsModal,
    setViewDetailsModal,
    setViewDetailsData,
    setViewDeatailsImg,
    viewDetailsData,
    viewDeatailsImg,
  } = props;
  return (
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
          type="primary"
          icon={<RollbackOutlined />}
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
  );
};

/* BORROWEDBOOKS PAGE */
export const BorrowedBooksViewDetailsModal = (props) => {
  const {
    viewDetailsModal,
    setViewDetailsModal,
    setViewDetailsData,
    setViewDeatailsImg,
    loginData,
    viewDetailsData,
    handleProcessReturn,
    handleProcessLost,
    viewDeatailsImg,
  } = props;
  return (
    <Modal
      key="BorrowedBookDetails"
      title="Transaction Details"
      width={1200}
      open={viewDetailsModal}
      onCancel={() => {
        setViewDetailsModal(false);
        setViewDetailsData();
        setViewDeatailsImg();
      }}
      footer={
        loginData.validUser.userType !== "Student" &&
          viewDetailsData?.status === "Borrowed"
          ? [
            <Popconfirm
              placement="top"
              title="Are you sure want to complete the process return?"
              onConfirm={handleProcessReturn}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button key="return" type="primary" icon={<EditOutlined />}>
                Process Return
              </Button>
            </Popconfirm>,
            <Popconfirm
              placement="top"
              title="Are you sure want to complete the process lost?"
              onConfirm={handleProcessLost}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button key="lost" type="primary" icon={<QuestionOutlined />}>
                Lost
              </Button>
            </Popconfirm>,
            <Button
              key="cancel"
              type="primary"
              icon={<RollbackOutlined />}
              onClick={() => {
                setViewDetailsModal(false);
                setViewDeatailsImg();
                setViewDetailsData();
              }}
            >
              Cancel
            </Button>,
          ]
          : loginData.validUser.userType !== "Student" &&
            viewDetailsData?.status === "Lost"
            ? [
              <Popconfirm
                placement="top"
                title="Are you sure want to complete the process return?"
                onConfirm={handleProcessReturn}
                okText="Confirm"
                cancelText="Cancel"
              >
                <Button key="return" type="primary" icon={<EditOutlined />}>
                  Process Return
                </Button>
              </Popconfirm>,
              <Button
                key="cancel"
                type="primary"
                icon={<RollbackOutlined />}
                onClick={() => {
                  setViewDetailsModal(false);
                  setViewDeatailsImg();
                  setViewDetailsData();
                }}
              >
                Cancel
              </Button>,
            ]
            : [
              <Button
                key="cancel"
                type="primary"
                icon={<RollbackOutlined />}
                onClick={() => {
                  setViewDetailsModal(false);
                  setViewDeatailsImg();
                  setViewDetailsData();
                }}
              >
                Cancel
              </Button>,
            ]
      }
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
  );
};

/* SHELF PAGE */
export const ShelfProcessingModal = (props) => {
  const {
    processModal,
    onCancelProcess,
    processButton,
    onProcessProceed,
    bookResult,
    studentResult,
    validateButton,
    libraryButton,
    studentInfo,
    bookButton,
    bookInfo,
    handleLibraryScan,
    handleBookScan,
    fetchBookData,
    fetchStudentData,
    onFinish,
  } = props;
  return (
    <Modal
      key="ProcessModal"
      title="Processing"
      width={1400}
      open={processModal}
      onCancel={onCancelProcess}
      footer={[
        <Button
          type="primary"
          icon={<EditOutlined />}
          hidden={processButton}
          onClick={onProcessProceed}
        >
          Process
        </Button>,

        bookResult && studentResult ? (
          <>
            <Button
              type="primary"
              icon={<CheckOutlined />}
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
        ) : null,
        <Button
          icon={<RollbackOutlined />}
          type="primary"
          onClick={onCancelProcess}
        >
          Cancel
        </Button>,
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
                  type="primary"
                  icon={<ScanOutlined />}
                  onClick={() => handleLibraryScan()}
                  hidden={libraryButton}
                  style={{
                    backgroundColor: "#FFC000",
                    border: "1px solid #d9d9d9",
                  }}
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
            <Button
              type="primary"
              icon={<ScanOutlined />}
              onClick={() => handleBookScan()}
              hidden={bookButton}
              style={{
                backgroundColor: "#FFC000",
                border: "1px solid #d9d9d9",
              }}
            >
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
      ></Row>
    </Modal>
  );
};

export const ShelfViewDetailsModal = (props) => {
  const {
    viewDetailsModal,
    setViewDetailsModal,
    setViewDetailsData,
    setViewDeatailsImg,
    viewDetailsData,
    viewDeatailsImg,
  } = props;
  return (
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
          type="primary"
          icon={<RollbackOutlined />}
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
  );
};

/* INVENTORY PAGE */
export const InventoryAddBookModal = (props) => {
  const { isOpen, setIsOpen, handleSingleModal, handleBatchModal } = props;
  return (
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
  );
};

export const InventoryBatchAddModal = (props) => {
  const {
    batchOpen,
    setBatchOpen,
    fileLists,
    handleFileUpload,
    handleFileRemove,
  } = props;
  return (
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
          Support for a single upload. Strictly prohibited from uploading file
          not supported by the given format.
        </p>
      </Dragger>
    </Modal>
  );
};

export const InventoryAvailableBooksModal = (props) => {
  const {
    viewDetailsModal,
    setViewDetailsModal,
    setViewDetailsData,
    setViewDeatailsImg,
    viewDetailsData,
    viewDeatailsImg,
  } = props;
  return (
    <Modal
      key="AvailableBookDetails"
      title="Available Book Details"
      width={1200}
      open={viewDetailsModal}
      onCancel={() => {
        setViewDetailsModal(false);
        setViewDetailsData();
        setViewDeatailsImg();
      }}
      footer={[
        <Button icon={<FormOutlined />} type="primary" key="update">
          Update
        </Button>,
        <Button icon={<DeleteOutlined />} type="primary" key="delete">
          Delete
        </Button>,
        <Button
          type="primary"
          icon={<RollbackOutlined />}
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
  );
};
