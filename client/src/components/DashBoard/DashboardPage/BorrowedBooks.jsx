/* eslint-disable array-callback-return */
import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import { Table, Button, Space, Input, message, Badge } from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  LikeOutlined,
  UndoOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";
import "antd/dist/antd.min.css";
import {
  BorrowedBookRateModal,
  BorrowedBooksViewDetailsModal,
} from "../AntdComponents/Modal/modal";
import emailjs from "@emailjs/browser";

const BorrowedBooks = (props) => {
  const {
    getBorrowedStudent,
    paginationStudentBorrowed,
    getBorrowedData,
    setCurrentActive,
    handleLogout,
  } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [value, setValue] = useState(0);
  const [rateDetails, setRateDetails] = useState(null);
  const [rateModal, setRateModal] = useState(false);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [notifButton, setNotifButton] = useState(false);
  const [notificiationCount, setNotificationCount] = useState();
  const [fee, setFee] = useState();

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

    const currentDate = new Date().getDate();
    const returnDate = new Date(record.returnDate).getDate();
    const remaining = returnDate - currentDate;

    if (remaining < 0) {
      const late = 20;
      let n = remaining;
      n = n * -1;

      const total = n * late;
      setFee(`Php ${total}.00`);
    } else {
      setFee("Php 0.00");
    }
  };

  const onViewBookRate = (record, e) => {
    e.defaultPrevented = true;
    setRateDetails(record);
    setRateModal(true);
  };

  const handleProcessReturn = async () => {
    const data = await fetch(`/book/process-return/${viewDetailsData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      message.success("Return Process Completed");
      setViewDetailsData(null);
      setViewDetailsModal(false);
      setFee();
      getBorrowedData();
    }
  };

  const handleProcessLost = async () => {
    const data = await fetch(`/book/process-lost/${viewDetailsData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      message.success("Lost Process Completed");
      setViewDetailsData(null);
      setViewDetailsModal(false);
      setFee();
      getBorrowedData();
    }
  };

  const handleRateConfirm = async () => {
    const data = await fetch(
      `/book-rate?_id=${rateDetails._id}&value=${value}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res.status === 200) {
      message.success("Rating Completed");
      setRateDetails(null);
      setRateModal(false);
      setCurrentActive(1);
    }
  };

  const handlePushNotification = async () => {
    setNotifButton(true);
    const data = await fetch("/book/borrowed/push-notification", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      if (res.body.length > 0) {
        res.body.map((data) => {
          emailjs.send(
            "service_in36rqr",
            "template_erxzdqe",
            {
              title: data.title,
              returnDate: new Date(data.returnDate).toLocaleString(),
              toName: data.firstName,
              toEmail: data.email,
            },
            "dDsfpQqNAM0v0YbNC"
          );
        });
        message.success("Notification Sent");
        setTimeout(() => {
          setNotifButton(false);
        }, 180000);
      } else {
        message.warn("Notification Failed, No upcoming deadlines");
      }
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
          prefix={<SearchOutlined style={{ marginRight: "10px" }} />}
          placeholder={`Search ${colName}`}
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

  const remainingDays = (date, status) => {
    const currentDate = new Date().getDate();
    const returnDate = new Date(date).getDate();
    const remaining = returnDate - currentDate;

    switch (status) {
      case "Borrowed":
        if (remaining > 4) {
          return (
            <>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5px",
                    color: "green",
                  }}
                >
                  {remaining}
                </p>
              </div>
            </>
          );
        }

        if (remaining > 1 && remaining < 5) {
          return (
            <>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5px",
                    color: "orange",
                  }}
                >
                  {remaining}
                </p>
              </div>
            </>
          );
        }

        if (remaining === 1) {
          return (
            <>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5px",
                    color: "red",
                  }}
                >
                  {remaining}
                </p>
              </div>
            </>
          );
        }

        if (remaining === 0) {
          return (
            <>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5px",
                    color: "red",
                  }}
                >
                  Due Date
                </p>
              </div>
            </>
          );
        }

        if (remaining < 0) {
          return (
            <>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5px",
                    color: "red",
                  }}
                >
                  Passed Due
                </p>
              </div>
            </>
          );
        }
        break;
      case "Lost":
        return (
          <>
            <div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                  color: "black",
                }}
              >
                Lost
              </p>
            </div>
          </>
        );
      default:
        return (
          <>
            <div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                  color: "black",
                }}
              >
                Returned
              </p>
            </div>
          </>
        );
    }

    // default:
    //   return (
    //     <>
    //       <div>
    //         <p
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             marginTop: "5px",
    //             color: "black",
    //           }}
    //         >
    //           Processed
    //         </p>
    //       </div>
    //     </>
    //   )
    // }
  };
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
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      width: "20%",
      render: (record) => <>{new Date(record).toLocaleString()}</>,
    },
    {
      title: "Remaining Days",
      dataIndex: ["returnDate", "status"],
      key: "remaindingDays",
      width: "20%",
      render: (text, row) => (
        <>{remainingDays(row["returnDate"], row["status"])}</>
      ),
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
              <Badge count={notificiationCount}>
                <Button
                  disabled={notifButton}
                  type="primary"
                  shape="round"
                  icon={<BellOutlined />}
                  onClick={() => handlePushNotification()}
                  style={{
                    backgroundColor: "#000080",
                    border: "1px solid #d9d9d9",
                  }}
                >
                  SEND NOTIFICATION
                </Button>
              </Badge>
            </div>
          </>
        ) : (
          ""
        ),
      dataIndex: "",
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              icon={<ReadOutlined />}
              type="primary"
              onClick={(e) => {
                onViewDetails(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              Details
            </Button>
            {loginData.validUser.userType !== "Super Admin" &&
            loginData.validUser.userType !== "Librarian" &&
            !record.isRated &&
            record.status === "Returned" ? (
              <Button
                icon={<LikeOutlined />}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
                type="primary"
                onClick={(e) => {
                  onViewBookRate(record, e);
                }}
              >
                Rate Book
              </Button>
            ) : null}
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
  const sendCount = async () => {
    const data = await fetch("/book/borrowed/push-notification", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setNotificationCount(res.body.length);
  };

  useEffect(() => {
    sendCount();
  }, []);

  const width = window.innerWidth;

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
              {width >= 450 ? "Borrowed Books" : "Borrowed"}
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
        <div className="card-body">
          <div className="table-responsive">
            <Table
              key="BorrowedBook"
              columns={columns}
              dataSource={getBorrowedStudent}
              pagination={paginationStudentBorrowed}
            />
            {/* ViewDetails Modal */}
            <BorrowedBooksViewDetailsModal
              viewDetailsModal={viewDetailsModal}
              setViewDetailsModal={setViewDetailsModal}
              setViewDetailsData={setViewDetailsData}
              setViewDeatailsImg={setViewDeatailsImg}
              loginData={loginData}
              viewDetailsData={viewDetailsData}
              handleProcessReturn={handleProcessReturn}
              handleProcessLost={handleProcessLost}
              viewDeatailsImg={viewDeatailsImg}
              setRateModal={setRateModal}
              fee={fee}
              setFee={setFee}
            />
            {/* RateBook Modal */}
            <BorrowedBookRateModal
              value={value}
              setValue={setValue}
              rateModal={rateModal}
              setRateModal={setRateModal}
              handleRateConfirm={handleRateConfirm}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default BorrowedBooks;
