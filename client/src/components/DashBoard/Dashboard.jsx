/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify";
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

const HomeDashboard = (props) => {
  const history = useNavigate();
  const { loginData } = useContext(LoginContext);
  const [currentActive, setCurrentActive] = useState(1);
  const [studentAccount, setStudentAccount] = useState();
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
    pageSize: 5,
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
  for (var key3 in getAddToShelf) {
    if (getAddToShelf.hasOwnProperty(key3)) {
      allBorrowedCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAllBorrowed, setPaginationAllBorrowed] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: allBorrowedCount,
  });

  const { newBooks } = props;

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
        `/book/student-shelf?email=${loginData.validUser.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await data.json();
      if (res.status === 200) {
        setGetAddToShelf(res.body);
      }
      setCurrentActive(4);
    }
  };

  // Ger borrowed book per student
  const getBorrowedPerStudent = async () => {
    if (loginData) {
      const data = await fetch(
        `/book/student-borrowed?email=${loginData.validUser.email}`,
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
  useEffect(() => {
    if (loginData) {
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
      };
      getInventoryData();
    }
  }, [loginData]);

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
    if (loginData?.validUser?.userType === "Student") {
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
        toast.warn("Logging Out", { position: toast.POSITION.TOP_CENTER });
        setTimeout(() => {
          localStorage.removeItem("studentToken");
          history("/");
        }, 4000);
      } else {
        toast.error("Error Occured", { position: toast.POSITION.TOP_CENTER });
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
        toast.warn("Logging Out", { position: toast.POSITION.TOP_CENTER });
        setTimeout(() => {
          localStorage.removeItem("librarianToken");
          history("/librarian-login");
        }, 4000);
      } else {
        toast.error("Error Occured", { position: toast.POSITION.TOP_CENTER });
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
        toast.warn("Logging Out", { position: toast.POSITION.TOP_CENTER });
        setTimeout(() => {
          localStorage.removeItem("adminToken");
          history("/admin-login");
        }, 4000);
      } else {
        toast.error("Error Occured", { position: toast.POSITION.TOP_CENTER });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span className="lab la-accusoft"></span>
            <span style={{color: "white"}}><img style={{width: "70px", height: "70px", marginRight: "10px"}} src={require("../../Assets/logo.png")} alt="logo-dashboard" />PHS LIBRARY</span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li key="li1">
              <a
                key={1}
                className={currentActive === 1 ? "active" : "none"}
                onClick={() => setCurrentActive(1)}
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
                  loginData.validUser.userType === "Student"
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
                  loginData.validUser.userType === "Student"
                    ? getAddShelfPerStudent()
                    : setCurrentActive(4)
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
                    onClick={() => setCurrentActive(5)}
                  >
                    <FileDoneOutlined />
                    <span className="las la-clipboard-list"></span>
                    <span>Inventory</span>
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
                    <span>Student Accounts</span>
                  </a>
                </li>
              </>
            ) : null}
            {loginData?.validUser?.userType === "Super Admin" ? (
              <>
                <li key="li8">
                  <a
                    key={8}
                    className={currentActive === 8 ? "active" : "none"}
                    onClick={() => setCurrentActive(8)}
                  >
                    <SettingOutlined />
                    <span className="las la-clipboard-list"></span>
                    <span>Settings</span>
                  </a>
                </li>
              </>
            ) : null}
            <li key="li9">
              <a
                key={8}
                onClick={() => {
                  handleLogout();
                }}
              >
                <LogoutOutlined />
                <span className="las la-clipboard-list"></span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        {currentActive === 1 ? (
          <>
            <Dashboard
              setCurrentActive={setCurrentActive}
              newBooks={newBooks}
            />
          </>
        ) : currentActive === 2 ? (
          <>
            <AvailableBooks
              genre={genre}
              setCurrentActive={setCurrentActive}
              getAddShelfPerStudent={getAddShelfPerStudent}
            />
          </>
        ) : currentActive === 3 ? (
          <>
            <BorrowedBooks
              getBorrowedStudent={
                loginData.validUser.userType === "Student"
                  ? getBorrowedStudent
                  : getAllBorrowed
              }
              paginationStudentBorrowed={
                loginData.validUser.userType === "Student"
                  ? paginationStudentBorrowed
                  : paginationAllBorrowed
              }
              getBorrowedData={getBorrowedData}
            />
          </>
        ) : currentActive === 4 ? (
          <>
            <Shelf
              getAddToShelf={
                loginData.validUser.userType === "Student"
                  ? getAddToShelf
                  : getAllShelf
              }
              paginationStudentShelf={
                loginData.validUser.userType === "Student"
                  ? paginationStudentShelf
                  : paginationAllShelf
              }
            />
          </>
        ) : currentActive === 5 ? (
          <>
            <Inventory
              getAvailable={getAvailable}
              paginationAvailable={paginationAvailable}
            />
          </>
        ) : currentActive === 6 ? (
          <>
            <Reports />
          </>
        ) : currentActive === 7 ? (
          <>
            <StudentAccounts
              studentAccount={studentAccount}
              getStudentAccounts={getStudentAccounts}
            />
          </>
        ) : currentActive === 8 ? (
          <>
            <Settings />
          </>
        ) : null}
      </div>
    </>
  );
};

export default HomeDashboard;
