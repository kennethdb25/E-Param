import React, { useContext, useRef, useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { LoginContext } from "../../../Context/Context";
import { Table, Button, Space, message, Input } from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  EditOutlined,
  UndoOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";
import "antd/dist/antd.min.css";
import {
  ShelfProcessingModal,
  ShelfViewDetailsModal,
} from "../AntdComponents/Modal/modal";

const Shelf = (props) => {
  const {
    getAddToShelf,
    paginationStudentShelf,
    getAddShelfPerStudent,
    getInventoryData,
    handleLogout,
  } = props;
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
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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

  const onConfirmRemoveBook = async () => {
    console.log(viewDetailsData);
    const data = await fetch(
      `/book/reserved/delete?_id=${viewDetailsData._id}&isbn=${viewDetailsData.isbn}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();

    if (res.status === 200) {
      message.success(
        loginData.validUser.userType === "Student"
          ? "Book removed in Shelf"
          : "Book Rejected Successfully"
      );
      getAddShelfPerStudent();
      getInventoryData();
      setViewDetailsModal(false);
    } else {
      onCancelProcess();
      message.warn("Something went wrong. Please try again later");
    }
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

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "15%",
      ...getColumnSearchProps("studentId", "Student ID"),
    },
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
      width: "15%",
      ...getColumnSearchProps("author", "Author"),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "20%",
      ...getColumnSearchProps("location", "Location"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "10%",
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
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {loginData.validUser.userType !== "Student" ? (
              <>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  style={{
                    backgroundColor: "#000080",
                    border: "1px solid #d9d9d9",
                  }}
                  onClick={(e) => handleProcess(e, record)}
                >
                  Process
                </Button>
              </>
            ) : null}
            <Button
              type="primary"
              icon={<ReadOutlined />}
              onClick={(e) => {
                onViewDetails(record, e);
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
              Shelf Item
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
        <div className="card-body">
          <div className="table-responsive">
            <Table
              key="ShelfBook"
              columns={columns}
              dataSource={getAddToShelf}
              pagination={paginationStudentShelf}
            />
            {/* Process Modal */}
            <ShelfProcessingModal
              processModal={processModal}
              onCancelProcess={onCancelProcess}
              processButton={processButton}
              onProcessProceed={onProcessProceed}
              bookResult={bookResult}
              studentResult={studentResult}
              validateButton={validateButton}
              libraryButton={libraryButton}
              studentInfo={studentInfo}
              bookButton={bookButton}
              bookInfo={bookInfo}
              handleLibraryScan={handleLibraryScan}
              handleBookScan={handleBookScan}
              fetchBookData={fetchBookData}
              fetchStudentData={fetchStudentData}
              onFinish={onFinish}
            />
            {/* ViewDetails Modal */}
            <ShelfViewDetailsModal
              viewDetailsModal={viewDetailsModal}
              setViewDetailsModal={setViewDetailsModal}
              setViewDetailsData={setViewDetailsData}
              setViewDeatailsImg={setViewDeatailsImg}
              viewDetailsData={viewDetailsData}
              viewDeatailsImg={viewDeatailsImg}
              onConfirmRemoveBook={onConfirmRemoveBook}
              loginData={loginData}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Shelf;
