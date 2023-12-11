/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/Context";
import {
  HomeOutlined,
  BookOutlined,
  FileProtectOutlined,
  ReadOutlined,
  BarChartOutlined,
  FileDoneOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Dashboard from "./DashboardPage/Dashboard";
import AvailableBooks from "./DashboardPage/AvailableBooks";
import BorrowedBooks from "./DashboardPage/BorrowedBooks";
import Shelf from "./DashboardPage/Shelf";
import Inventory from "./DashboardPage/Inventory";
import Reports from "./DashboardPage/Reports";
import StudentAccounts from "./DashboardPage/StudentAccounts";
import Settings from "./DashboardPage/Settings";
import "./style.css";
import "antd/dist/antd.min.css";
import { Drawer, Space, message } from "antd";
import AttendanceDashboard from "../Attendance/AttendanceDashboard";

const HomeDashboard = (props) => {
  const history = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  const [currentActive, setCurrentActive] = useState(1);
  const [studentAccount, setStudentAccount] = useState();
  const [adminAccount, setAdminAccount] = useState();
  const [librarianAccount, setLibrarianAccount] = useState();
  const [otherAccount, setOtherAccount] = useState();
  const [genre, setGenre] = useState();
  // Table Data
  // get all available table config
  const [getAvailable, setGetAvailable] = useState();
  let availableCount = 0;
  for (var key in getAvailable) {
    if (getAvailable.hasOwnProperty(key)) {
      availableCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAvailable, setPaginationAvailable] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: availableCount,
  });

  // get reserved books per student table config
  const [getAddToShelf, setGetAddToShelf] = useState();
  let studentShelfCount = 0;
  for (var key1 in getAddToShelf) {
    if (getAddToShelf.hasOwnProperty(key1)) {
      studentShelfCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationStudentShelf, setPaginationStudentShelf] = useState({
    defaultCurrent: 1,
    pageSize: 10,
    total: studentShelfCount,
  });

  // ger all reserved books table config
  const [getAllShelf, setGetAllShelf] = useState();
  let allShelfCount = 0;
  for (var keyRes in getAddToShelf) {
    if (getAddToShelf.hasOwnProperty(keyRes)) {
      allShelfCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAllShelf, setPaginationAllShelf] = useState({
    defaultCurrent: 1,
    pageSize: 10,
    total: allShelfCount,
  });

  // get borrowed books per student table config
  const [getBorrowedStudent, setGetBorrowedStudent] = useState();
  let studentBorrowedCount = 0;
  for (var key2 in getBorrowedStudent) {
    if (getBorrowedStudent.hasOwnProperty(key2)) {
      studentBorrowedCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationStudentBorrowed, setPaginationStudentBorrowed] = useState({
    defaultCurrent: 1,
    pageSize: 10,
    total: studentBorrowedCount,
  });

  // ger all reserved books table config
  const [getAllBorrowed, setGetAllBorrowed] = useState();
  let allBorrowedCount = 0;
  for (var key3 in getAllBorrowed) {
    if (getAllBorrowed.hasOwnProperty(key3)) {
      allBorrowedCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAllBorrowed, setPaginationAllBorrowed] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: allBorrowedCount,
  });

  // get all lost books
  const [lostBookCount, setLostBookCount] = useState();
  let allLostCount = 0;
  for (var key4 in lostBookCount) {
    if (lostBookCount.hasOwnProperty(key4)) {
      allLostCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAllLost, setPaginationAllLost] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: allLostCount,
  });

  // get all lost books
  const [forReviewBook, setForReviewBook] = useState();
  let allReviewCount = 0;
  for (var key5 in forReviewBook) {
    if (forReviewBook.hasOwnProperty(key5)) {
      allReviewCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAllRevew, setPaginationAllReview] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: allReviewCount,
  });

  const {
    newBooks,
    section,
    sectiionData,
    announcement,
    announcementData,
    activeAnnouncement,
    activeAnnouncementData,
    bookRatingsChart,
    bookRatingsData,
    borrowedRatingsChart,
    borrowedRatingsData,
    LoginValid,
    setData,
  } = props;

  // Genre Tab
  const getGenre = async () => {
    const data = await fetch("/book/get-genre", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      setGenre(res.body);
    }
    setCurrentActive(2);
  };

  // Get reserved book per student
  const getAddShelfPerStudent = async () => {
    if (loginData) {
      const data = await fetch(
        `/book/student-shelf?email=${loginData?.validUser?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await data.json();
      if (res.status === 200) {
        setGetAddToShelf(res.body || []);
      }
      setCurrentActive(4);
    }
  };

  // Ger borrowed book per student
  const getBorrowedPerStudent = async () => {
    if (loginData) {
      const data = await fetch(
        `/book/student-borrowed?email=${loginData?.validUser?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await data.json();
      if (res.status === 200) {
        setGetBorrowedStudent(res.body);
      }
      setCurrentActive(3);
    }
  };

  const getBorrowedData = async () => {
    const allBorrowedData = await fetch("/book/get-borrowed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allBorrowedRes = await allBorrowedData.json();
    if (allBorrowedRes.status === 200) {
      setGetAllBorrowed(allBorrowedRes.body);
    }
    setCurrentActive(3);
  };

  // Get Inventory Data

  const getInventoryData = async () => {
    const data = await fetch("/book/get-available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      setGetAvailable(res.body);
    }

    const allReservedData = await fetch("/book/get-reserved", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allReservedRes = await allReservedData.json();

    if (res.status === 200) {
      setGetAllShelf(allReservedRes.body);
    }

    const lostBooksData = await fetch("/book/get-all-lost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resLostBook = await lostBooksData.json();
    if (resLostBook.status === 200) {
      setLostBookCount(resLostBook.body);
    }

    const reviewBooksData = await fetch("/book/get-all-review", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resReviewBook = await reviewBooksData.json();
    if (resReviewBook.status === 200) {
      setForReviewBook(resReviewBook.body);
    }

    const adminData = await fetch("/admin/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resAdmin = await adminData.json();
    if (resAdmin.status === 200) {
      setAdminAccount(resAdmin.body);
    }

    const otherData = await fetch("/other/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resOther = await otherData.json();
    if (resOther.status === 200) {
      setOtherAccount(resOther.body);
    }

    const librarianData = await fetch("/librarian/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resLibrarian = await librarianData.json();
    if (resLibrarian.status === 200) {
      setLibrarianAccount(resLibrarian.body);
    }
  };

  // Get Student Account
  const getStudentAccounts = async () => {
    const res = await fetch("/student/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await res.json();
    setStudentAccount(newData);
    setCurrentActive(7);
  };

  const handleLogout = async () => {
    if (
      loginData?.validUser?.userType !== "Super Admin" &&
      loginData?.validUser?.userType !== "Librarian"
    ) {
      let token = localStorage.getItem("studentToken");
      const res = await fetch("/student/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === 201) {
        setData(false);
        message.warn("Logging Out");
        setTimeout(() => {
          localStorage.removeItem("studentToken");
          history("/");
          setLoginData(null);
          setData(true);
        }, 3000);
      } else {
        message.error("Error Occured");
      }
    } else if (loginData?.validUser?.userType === "Librarian") {
      let token = localStorage.getItem("librarianToken");
      const res = await fetch("/librarian/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === 201) {
        message.warn("Logging Out");
        setTimeout(() => {
          localStorage.removeItem("librarianToken");
          history("/librarian-login");
          setLoginData(null);
          setData(true);
        }, 3000);
      } else {
        message.error("Error Occured");
      }
    } else if (loginData?.validUser?.userType === "Super Admin") {
      let token = localStorage.getItem("adminToken");
      const res = await fetch("/admin/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === 201) {
        message.warn("Logging Out");
        setTimeout(() => {
          localStorage.removeItem("adminToken");
          history("/admin-login");
          setLoginData(null);
          setData(true);
        }, 3000);
      } else {
        message.error("Error Occured");
      }
    }
  };

  useEffect(() => {
    LoginValid();
    if (!loginData) {
      history("/error-not-found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span className="lab la-accusoft">
              <img
                // style={{ width: "70px", height: "70px", marginRight: "10px" }}
                src={require("../../Assets/logo.png")}
                alt="logo-dashboard"
              />
            </span>
            <span style={{ color: "white" }}>
              <img
                style={{ width: "70px", height: "70px", marginRight: "10px" }}
                src={require("../../Assets/logo.png")}
                alt="logo-dashboard"
              />
              PHS LIBRARY
            </span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li key="li1">
              <a
                key={1}
                className={currentActive === 1 ? "active" : "none"}
                onClick={() => (
                  setCurrentActive(1),
                  bookRatingsChart(),
                  borrowedRatingsChart()
                )}
              >
                <HomeOutlined />
                <span className="las la-igloo"></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li key="li2">
              <a
                key={2}
                className={currentActive === 2 ? "active" : "none"}
                onClick={() => getGenre()}
              >
                <FileProtectOutlined />
                <span className="las la-users"></span>
                <span>Available Books</span>
              </a>
            </li>
            <li key="li3">
              <a
                key={3}
                className={currentActive === 3 ? "active" : "none"}
                onClick={() =>
                  loginData?.validUser?.userType !== "Librarian" &&
                  loginData?.validUser?.userType !== "Super Admin"
                    ? getBorrowedPerStudent()
                    : getBorrowedData()
                }
              >
                <BookOutlined />
                <span className="las la-clipboard-list"></span>
                <span>Borrowed Books</span>
              </a>
            </li>
            <li key="li4">
              <a
                key={4}
                className={currentActive === 4 ? "active" : "none"}
                onClick={() =>
                  loginData?.validUser?.userType !== "Librarian" &&
                  loginData?.validUser?.userType !== "Super Admin"
                    ? getAddShelfPerStudent()
                    : (setCurrentActive(4), getInventoryData())
                }
              >
                <ReadOutlined />
                <span className="las la-clipboard-list"></span>
                <span>Shelf</span>
              </a>
            </li>
            {loginData?.validUser?.userType === "Librarian" ||
            loginData?.validUser?.userType === "Super Admin" ? (
              <>
                <li key="li5">
                  <a
                    key={5}
                    className={currentActive === 5 ? "active" : "none"}
                    onClick={() => (setCurrentActive(5), getInventoryData())}
                  >
                    <FileDoneOutlined />
                    <span className="las la-clipboard-list"></span>
                    <span>Catalog</span>
                  </a>
                </li>
              </>
            ) : null}
            {loginData?.validUser?.userType === "Librarian" ||
            loginData?.validUser?.userType === "Super Admin" ? (
              <>
                <li key="li6">
                  <a
                    key={6}
                    className={currentActive === 6 ? "active" : "none"}
                    onClick={() => setCurrentActive(6)}
                  >
                    <BarChartOutlined />
                    <span className="las la-clipboard-list"></span>
                    <span>Reports</span>
                  </a>
                </li>
              </>
            ) : null}
            {loginData?.validUser?.userType === "Librarian" ||
            loginData?.validUser?.userType === "Super Admin" ? (
              <>
                <li key="li7">
                  <a
                    key={7}
                    className={currentActive === 7 ? "active" : "none"}
                    onClick={() => getStudentAccounts()}
                  >
                    <UserOutlined />
                    <span className="las la-clipboard-list"></span>
                    <span>Accounts</span>
                  </a>
                </li>
              </>
            ) : null}
            {loginData.validUser?.userType === "Librarian" ||
            loginData.validUser?.userType === "Super Admin" ? (
              <>
                <li key="li8">
                  <a
                    key={8}
                    className={currentActive === 8 ? "active" : "none"}
                    onClick={() => (setCurrentActive(8), getInventoryData())}
                  >
                    <SettingOutlined />
                    <span className="las la-clipboard-list"></span>
                    <span>Settings</span>
                  </a>
                </li>
              </>
            ) : null}
            {loginData.validUser?.userType === "Librarian" ||
            loginData.validUser?.userType === "Super Admin" ? (
              <li key="li9">
                <a
                  key={9}
                  onClick={() => (
                    setCurrentActive(9), activeAnnouncementData()
                  )}
                >
                  <ScheduleOutlined />
                  <span className="las la-clipboard-list"></span>
                  <span>Attendance Dashboard</span>
                </a>
              </li>
            ) : null}
          </ul>
          {loginData.validUser?.userType !== "Librarian" ||
          loginData.validUser?.userType !== "Super Admin" ? (
            <div
              className={
                loginData.validUser?.userType !== "Librarian" ||
                loginData.validUser?.userType !== "Super Admin"
                  ? "logout-student"
                  : "logout"
              }
            >
              <a
                key={10}
                onClick={() => {
                  handleLogout();
                }}
              >
                <LogoutOutlined />
                <span className="las la-clipboard-list"></span>
                <span>Logout</span>
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="main-content">
        {currentActive === 1 ? (
          <>
            <Dashboard
              setCurrentActive={setCurrentActive}
              newBooks={newBooks}
              bookRatingsData={bookRatingsData}
              borrowedRatingsData={borrowedRatingsData}
              getBorrowedData={getBorrowedData}
              getAddShelfPerStudent={getAddShelfPerStudent}
              handleLogout={handleLogout}
            />
          </>
        ) : currentActive === 2 ? (
          <>
            <AvailableBooks
              genre={genre}
              setCurrentActive={setCurrentActive}
              getAddShelfPerStudent={getAddShelfPerStudent}
              handleLogout={handleLogout}
            />
          </>
        ) : currentActive === 3 ? (
          <>
            <BorrowedBooks
              getBorrowedStudent={
                loginData?.validUser?.userType !== "Super Admin" &&
                loginData?.validUser?.userType !== "Librarian"
                  ? getBorrowedStudent
                  : getAllBorrowed
              }
              paginationStudentBorrowed={
                loginData?.validUser?.userType !== "Super Admin" &&
                loginData?.validUser?.userType !== "Librarian"
                  ? paginationStudentBorrowed
                  : paginationAllBorrowed
              }
              getBorrowedData={getBorrowedData}
              setCurrentActive={setCurrentActive}
              handleLogout={handleLogout}
            />
          </>
        ) : currentActive === 4 ? (
          <>
            <Shelf
              getAddToShelf={
                loginData?.validUser?.userType !== "Super Admin" &&
                loginData?.validUser?.userType !== "Librarian"
                  ? getAddToShelf
                  : getAllShelf
              }
              paginationStudentShelf={
                loginData?.validUser?.userType !== "Super Admin" ||
                loginData?.validUser?.userType !== "Librarian"
                  ? paginationStudentShelf
                  : paginationAllShelf
              }
              getAddShelfPerStudent={getAddShelfPerStudent}
              getInventoryData={getInventoryData}
              handleLogout={handleLogout}
            />
          </>
        ) : currentActive === 5 ? (
          <>
            <Inventory
              getAvailable={getAvailable}
              paginationAvailable={paginationAvailable}
              lostBookCount={lostBookCount}
              paginationAllLost={paginationAllLost}
              forReviewBook={forReviewBook}
              paginationAllRevew={paginationAllRevew}
              getInventoryData={getInventoryData}
              handleLogout={handleLogout}
            />
          </>
        ) : currentActive === 6 ? (
          <>
            <Reports handleLogout={handleLogout} />
          </>
        ) : currentActive === 7 ? (
          <>
            <StudentAccounts
              studentAccount={studentAccount}
              getStudentAccounts={getStudentAccounts}
              handleLogout={handleLogout}
            />
          </>
        ) : currentActive === 8 ? (
          <>
            <Settings
              adminAccount={adminAccount}
              librarianAccount={librarianAccount}
              otherAccount={otherAccount}
              section={section}
              sectiionData={sectiionData}
              announcement={announcement}
              announcementData={announcementData}
              handleLogout={handleLogout}
              getInventoryData={getInventoryData}
            />
          </>
        ) : null}
      </div>
      <Drawer
        title="PAMPANGA HIGH SCHOOL LIBRARY"
        placement="left"
        onClose={() => setCurrentActive(1)}
        open={currentActive === 9 ? true : false}
        height="100vh"
        width="100%"
        style={{ display: "flex", justifyContent: "center" }}
        extra={<Space></Space>}
      >
        <AttendanceDashboard activeAnnouncement={activeAnnouncement} />
      </Drawer>
    </>
  );
};

export default HomeDashboard;
