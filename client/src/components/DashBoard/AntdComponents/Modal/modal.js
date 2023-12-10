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
  Rate,
  Form,
} from "antd";
import {
  InboxOutlined,
  RollbackOutlined,
  EditOutlined,
  QuestionOutlined,
  ScanOutlined,
  CheckOutlined,
  DeleteOutlined,
  FormOutlined,
  UserOutlined,
  MailOutlined,
  InfoCircleOutlined,
  BookOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  PlusOutlined,
  MinusCircleOutlined,
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
      title="BOOK DETAILS"
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
              <Input
                value={viewDetailsData?.title}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.author}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.isbn}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.assession}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.desc}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.publication}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Building Stock
              </Title>
              <Input
                value={viewDetailsData?.bldgStock}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Number of Copies
              </Title>
              <Input
                value={viewDetailsData?.qty}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Penalty
              </Title>
              <Input
                value={viewDetailsData?.lostPenalty}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.location}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.genre}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Book Rate
              </Title>
              <Rate allowHalf value={viewDetailsData?.ratings} disabled />
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
    setRateModal,
    fee,
    setFee,
  } = props;
  return (
    <Modal
      key="BorrowedBookDetails"
      title="TRANSACTION DETAILS"
      width={1200}
      open={viewDetailsModal}
      onCancel={() => {
        setViewDetailsModal(false);
        setViewDetailsData();
        setViewDeatailsImg();
        setRateModal(0);
        setFee();
      }}
      footer={
        (loginData.validUser?.userType === "Super Admin" ||
          loginData.validUser?.userType === "Librarian") &&
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
                title={`Borrower needs to pay security deposit of Php ${viewDetailsData.lostPenalty}.00 first.`}
                onConfirm={handleProcessLost}
                okText="Confirm"
                cancelText="Cancel"
                style={{ width: "100px" }}
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
                  setRateModal(0);
                  setFee();
                }}
              >
                Cancel
              </Button>,
            ]
          : (loginData.validUser?.userType === "Super Admin" ||
              loginData.validUser?.userType === "Librarian") &&
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
          <h1>Account Info</h1>
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
              <Input
                value={viewDetailsData?.firstName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.middleName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.lastName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.studentId}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.grade}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.section}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.email}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.status}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={new Date(viewDetailsData?.dateBorrowed).toLocaleString()}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.title}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.author}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.isbn}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.assession}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.desc}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.publication}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.location}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.genre}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Rate by Student
              </Title>
              <Rate disabled defaultValue={viewDetailsData?.ratings} />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              {viewDetailsData?.status !== "Lost" ? (
                <>
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Late Fee: {fee}
                  </Title>
                </>
              ) : (
                <>
                  <Title
                    level={5}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Security Deposit: {`Php ${viewDetailsData.lostPenalty}.00`}
                  </Title>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export const BorrowedBookRateModal = (props) => {
  const { value, rateModal, setValue, setRateModal, handleRateConfirm } = props;
  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
  return (
    <Modal
      key="BookRate"
      title="RATE BOOK"
      width={400}
      open={rateModal}
      onCancel={() => {
        setRateModal(false);
      }}
      footer={[
        <Button
          type="primary"
          icon={<CheckOutlined />}
          key="cancel"
          onClick={() => {
            handleRateConfirm();
          }}
        >
          Confirm
        </Button>,
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="confirm"
          onClick={() => {
            setRateModal(false);
            setValue(0);
          }}
        >
          Cancel
        </Button>,
      ]}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Rate tooltips={desc} onChange={setValue} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
      </span>
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
    handleLibraryScan,
    fetchBookData,
    fetchStudentData,
    onFinish,
    recordedData,
  } = props;
  return (
    <Modal
      key="ProcessModal"
      title="PROCESSING..."
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

        studentResult ? (
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
      <h1>
        <UserOutlined style={{ marginRight: "10px" }} />
        ACCOUNT INFO
      </h1>
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
              <Input
                value={studentInfo?.studentId}
                prefix={<UserOutlined style={{ marginRight: "10px" }} />}
                placeholder="Student ID"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
              <Input
                value={studentInfo?.firstName}
                prefix={<UserOutlined style={{ marginRight: "10px" }} />}
                placeholder="First Name"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
              <Input
                value={studentInfo?.middleName}
                prefix={<UserOutlined style={{ marginRight: "10px" }} />}
                placeholder="Middle Name"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
              <Input
                value={studentInfo?.lastName}
                prefix={<UserOutlined style={{ marginRight: "10px" }} />}
                placeholder="Last Name"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
              <Input
                value={studentInfo?.email}
                prefix={<MailOutlined style={{ marginRight: "10px" }} />}
                placeholder="Email Address"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
              <Input
                value={studentInfo?.grade}
                prefix={<InfoCircleOutlined style={{ marginRight: "10px" }} />}
                placeholder="Grade"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
              <Input
                value={studentInfo?.section}
                prefix={<InfoCircleOutlined style={{ marginRight: "10px" }} />}
                placeholder="Section"
                style={{ borderRadius: "10px", marginTop: "15px" }}
                readOnly
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <h1>
        <BookOutlined style={{ marginRight: "10px" }} />
        BOOK INFO
      </h1>
      <Row gutter={12}>
        <Col xs={{ span: 8 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.isbn}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="ISBN"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.title}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="Book Name"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.author}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="Author Name"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.location}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="Location"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.publication}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="Publication"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.assession}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="Accession Number"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 8 }} layout="vertical">
          <Input
            value={recordedData?.genre}
            prefix={<BookOutlined style={{ marginRight: "10px" }} />}
            placeholder="Genre"
            style={{ borderRadius: "10px", marginTop: "15px" }}
            readOnly
          />
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
    onConfirmRemoveBook,
    loginData,
  } = props;
  return (
    <Modal
      key="BookDetailsAvailable"
      title="RESERVATION DETAILS"
      width={1200}
      open={viewDetailsModal}
      onCancel={() => {
        setViewDetailsModal(false);
        setViewDetailsData();
        setViewDeatailsImg();
      }}
      footer={[
        <Popconfirm
          placement="top"
          title={
            loginData.validUser?.userType !== "Super Admin" ||
            loginData.validUser?.userType !== "Librarian"
              ? "Are you sure want to remove this book?"
              : "Are you sure want to reject this book?"
          }
          onConfirm={onConfirmRemoveBook}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button key="remove" type="primary" icon={<MinusCircleOutlined />}>
            {loginData.validUser?.userType !== "Super Admin" &&
            loginData.validUser?.userType !== "Librarian"
              ? "Remove"
              : "Reject"}
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
      ]}
    >
      <Row>
        <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <h1>
            <UserOutlined style={{ marginRight: "10px" }} />
            ACCOUNT INFO
          </h1>
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
              <Input
                value={viewDetailsData?.firstName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.middleName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.lastName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.studentId}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.grade}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.section}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.email}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                User Type
              </Title>
              <Input
                value={viewDetailsData?.userType}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={new Date(viewDetailsData?.dateReserved).toLocaleString()}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
          </Row>
          <h1
            style={{
              marginTop: "30px",
            }}
          >
            <BookOutlined style={{ marginRight: "10px" }} />
            BOOK INFO
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
              <Input
                value={viewDetailsData?.title}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.author}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.isbn}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.assession}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.desc}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.publication}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Building Stock
              </Title>
              <Input
                value={viewDetailsData?.bldgStock}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Penalty Cost (Lost)
              </Title>
              <Input
                value={viewDetailsData?.lostPenalty}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.location}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewDetailsData?.genre}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel"
          onClick={() => setIsOpen(false)}
        >
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
        <Button
          icon={<FileAddOutlined />}
          type="primary"
          onClick={() => handleSingleModal()}
        >
          SINGLE ADD
        </Button>
        <Button
          icon={<FolderAddOutlined />}
          type="primary"
          onClick={() => handleBatchModal()}
        >
          BATCH ADD
        </Button>
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
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel"
          onClick={() => setBatchOpen(false)}
        >
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

export const InventoryLostBooksModal = (props) => {
  const {
    viewDetailsLostModal,
    setViewDetailsLostModal,
    setViewDetailsData,
    setViewDeatailsImg,
    viewDetailsData,
    viewDeatailsImg,
  } = props;
  return (
    <Modal
      key="LostBookDetails"
      title="Lost Book Details"
      width={1200}
      open={viewDetailsLostModal}
      onCancel={() => {
        setViewDetailsLostModal(false);
        setViewDetailsData();
        setViewDeatailsImg();
      }}
      footer={[
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel"
          onClick={() => {
            setViewDetailsLostModal(false);
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
          <h1>Account Info</h1>
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
                Date Lost
              </Title>
              <Input
                value={new Date(viewDetailsData?.dateLost).toLocaleString()}
                readOnly
              />
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
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Building Stock
              </Title>
              <Input
                value={viewDetailsData?.bldgStock}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Penalty
              </Title>
              <Input
                value={viewDetailsData?.lostPenalty}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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

export const InventoryAvailableBooksModal = (props) => {
  const {
    viewDetailsModal,
    setViewDetailsModal,
    setViewDetailsData,
    setViewDeatailsImg,
    viewDetailsData,
    viewDeatailsImg,
    handleBookDelete,
    handleUpdateModal,
    updateData,
  } = props;
  return (
    <Modal
      key="AvailableBookDetails"
      title="AVAILABLE BOOK DETAILS"
      width={1200}
      open={viewDetailsModal}
      onCancel={() => {
        setViewDetailsModal(false);
        setViewDetailsData();
        setViewDeatailsImg();
      }}
      footer={[
        <Popconfirm
          placement="top"
          title="Are you sure want to update this book?"
          onConfirm={() => handleUpdateModal(viewDetailsData)}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button icon={<FormOutlined />} type="primary" key="update">
            Update
          </Button>
        </Popconfirm>,
        <Popconfirm
          placement="top"
          title="Are you sure want to delete this book?"
          onConfirm={() => handleBookDelete()}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button icon={<DeleteOutlined />} type="primary" key="delete">
            Delete
          </Button>
        </Popconfirm>,
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
              <Input value={updateData?.title} readOnly />
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
              <Input value={updateData?.author} readOnly />
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
              <Input value={updateData?.isbn} readOnly />
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
              <Input value={updateData?.assession} readOnly />
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
              <Input value={updateData?.desc} readOnly />
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
              <Input value={updateData?.publication} readOnly />
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
                Building Stock
              </Title>
              <Input
                value={updateData?.bldgStock}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Number of Copies
              </Title>
              <Input
                value={updateData?.qty}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                Penalty
              </Title>
              <Input
                value={updateData?.lostPenalty}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                value={updateData?.abstract}
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
              <Input value={updateData?.location} readOnly />
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
              <Input value={updateData?.genre} readOnly />
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
                value={updateData?.notes}
                readOnly
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export const InventoryForReviewAddImageModal = (props) => {
  const {
    forReviewOpen,
    setForReviewOpen,
    handleFileUpdloadReview,
    imgprops,
    onPreview,
    form,
    onConfirmReview,
  } = props;
  return (
    <Modal
      title="ADD IMAGE FOR REVIEW"
      width={400}
      open={forReviewOpen}
      onCancel={() => setForReviewOpen(false)}
      footer={[
        <Button
          type="primary"
          icon={<CheckOutlined />}
          key="cancel9"
          onClick={() => onConfirmReview()}
        >
          Confirm
        </Button>,
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel9"
          onClick={() => setForReviewOpen(false)}
        >
          Cancel
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        layout="horizontal"
        onFinish={handleFileUpdloadReview}
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 24 }}>
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
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const LibrarianAccountDetailsModal = (props) => {
  const {
    viewLDetailsModal,
    setViewLDetailsModal,
    setViewLDetailsData,
    setViewLDeatailsImg,
    viewLDetailsData,
    viewLDeatailsImg,
  } = props;

  return (
    <Modal
      key="LibrarianAccountDetails"
      title="ACCOUNT DETAILS"
      width={1200}
      open={viewLDetailsModal}
      onCancel={() => {
        setViewLDetailsModal(false);
        setViewLDetailsData();
        setViewLDeatailsImg();
      }}
      footer={[
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel"
          onClick={() => {
            setViewLDetailsModal(false);
            setViewLDetailsData();
            setViewLDeatailsImg();
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
                Employee ID
              </Title>
              <Input
                value={viewLDetailsData?.employeeId}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                First Name
              </Title>
              <Input
                value={viewLDetailsData?.firstName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewLDetailsData?.middleName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Last Name
              </Title>
              <Input
                value={viewLDetailsData?.lastName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                User Type
              </Title>
              <Input
                value={viewLDetailsData?.userType}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewLDetailsData?.email}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Profile Photo
              </Title>
              <Image src={viewLDeatailsImg} alt="Book Details" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export const AdminAccountDetailsModal = (props) => {
  const {
    viewADetailsModal,
    setViewADetailsModal,
    setViewADetailsData,
    setViewADeatailsImg,
    viewADetailsData,
    viewADeatailsImg,
  } = props;

  return (
    <Modal
      key="LibrarianAccountDetails"
      title="ACCOUNT DETAILS"
      width={1200}
      open={viewADetailsModal}
      onCancel={() => {
        setViewADetailsModal(false);
        setViewADetailsData();
        setViewADeatailsImg();
      }}
      footer={[
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel"
          onClick={() => {
            setViewADetailsModal(false);
            setViewADetailsData();
            setViewADeatailsImg();
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
                Employee ID
              </Title>
              <Input
                value={viewADetailsData?.employeeId}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                First Name
              </Title>
              <Input
                value={viewADetailsData?.firstName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewADetailsData?.middleName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Last Name
              </Title>
              <Input
                value={viewADetailsData?.lastName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                User Type
              </Title>
              <Input
                value={viewADetailsData?.userType}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewADetailsData?.email}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Profile Photo
              </Title>
              <Image src={viewADeatailsImg} alt="Book Details" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export const OtherAccountDetailsModal = (props) => {
  const {
    viewODetailsModal,
    setViewODetailsModal,
    setViewODetailsData,
    setViewODetailsImg,
    viewODetailsData,
    viewODetailsImg,
  } = props;

  return (
    <Modal
      key="OtherAccountDetails"
      title="ACCOUNT DETAILS"
      width={1200}
      open={viewODetailsModal}
      onCancel={() => {
        setViewODetailsData();
        setViewODetailsModal(false);
        setViewODetailsImg();
      }}
      footer={[
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          key="cancel"
          onClick={() => {
            setViewODetailsData();
            setViewODetailsModal(false);
            setViewODetailsImg();
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
                Employee ID
              </Title>
              <Input
                value={viewODetailsData?.studentId}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                First Name
              </Title>
              <Input
                value={viewODetailsData?.firstName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewODetailsData?.middleName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Last Name
              </Title>
              <Input
                value={viewODetailsData?.lastName}
                readOnly
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Title
                level={5}
                style={{
                  marginTop: "20px",
                }}
              >
                User Type
              </Title>
              <Input
                value={viewODetailsData?.userType}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
              <Input
                value={viewODetailsData?.email}
                readOnly
                style={{ borderRadius: "10px" }}
              />
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
                Profile Photo
              </Title>
              <Image src={viewODetailsImg} alt="Book Details" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
