/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
} from "@ant-design/icons";
import Dashboard from "./DashboardPage/Dashboard";
import AvailableBooks from "./DashboardPage/AvailableBooks";
import BorrowedBooks from "./DashboardPage/BorrowedBooks";
import Shelf from "./DashboardPage/Shelf";
import Inventory from "./DashboardPage/Inventory";
import Reports from "./DashboardPage/Reports";
import Settings from "./DashboardPage/Settings";
import "./style.css";
import "antd/dist/antd.min.css";

const HomeDashboard = () => {
  const history = useNavigate();
  const { loginData } = useContext(LoginContext)
  const [currentActive, setCurrentActive] = useState(1);

  const handleLogout = async () => {
    if (loginData?.validUser?.userType === 'Student') {
      let token = localStorage.getItem('studentToken');
      const res = await fetch('/student/logout', {
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
    } else if (loginData?.validUser?.userType === 'Librarian') {
      let token = localStorage.getItem('librarianToken');
      const res = await fetch('/librarian/logout', {
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
    } else if (loginData?.validUser?.userType === 'Super Admin') {
      let token = localStorage.getItem('adminToken');
      const res = await fetch('/admin/logout', {
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
  }

  return (
    <>
      <input type="checkbox" id="nav-toggle" />
      <ToastContainer />

      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span className="lab la-accusoft"></span>
            <span>E-PARAM Library</span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <a
                key={1}
                className={currentActive === 1 ? "active" : "none"}
                onClick={() => setCurrentActive(1)}
              >
                <span className="las la-igloo">
                  <HomeOutlined />
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                key={2}
                className={currentActive === 2 ? "active" : "none"}
                onClick={() => setCurrentActive(2)}
              >
                <span className="las la-users">
                  <FileProtectOutlined />
                </span>
                <span>Available Books</span>
              </a>
            </li>
            <li>
              <a
                key={3}
                className={currentActive === 3 ? "active" : "none"}
                onClick={() => setCurrentActive(3)}
              >
                <span className="las la-clipboard-list">
                  <BookOutlined />
                </span>
                <span>Borrowed Books</span>
              </a>
            </li>
            <li>
              <a
                key={4}
                className={currentActive === 4 ? "active" : "none"}
                onClick={() => setCurrentActive(4)}
              >
                <span className="las la-clipboard-list">
                  <ReadOutlined />
                </span>
                <span>Shelf</span>
              </a>
            </li>
            { loginData?.validUser?.userType === 'Librarian' || loginData?.validUser?.userType === 'Super Admin' ?
            (
              <>
                <li>
                  <a
                    key={5}
                    className={currentActive === 5 ? "active" : "none"}
                    onClick={() => setCurrentActive(5)}
                  >
                    <span className="las la-clipboard-list">
                      <FileDoneOutlined />
                    </span>
                    <span>Inventory</span>
                  </a>
                </li>
              </>
            ) : null }
            { loginData?.validUser?.userType === 'Librarian' || loginData?.validUser?.userType === 'Super Admin' ?
            (
              <>
                <li>
                  <a
                    key={6}
                    className={currentActive === 6 ? "active" : "none"}
                    onClick={() => setCurrentActive(6)}
                  >
                    <span className="las la-clipboard-list">
                      <BarChartOutlined />
                    </span>
                    <span>Reports</span>
                  </a>
               </li>
              </>
            ) : null }
            { loginData?.validUser?.userType === 'Super Admin' ?
            (
              <>
                <li>
                  <a
                    key={7}
                    className={currentActive === 7 ? "active" : "none"}
                    onClick={() => setCurrentActive(7)}
                  >
                    <span className="las la-clipboard-list">
                      <SettingOutlined />
                    </span>
                    <span>Settings</span>
                  </a>
                </li>
              </>
            ) : null }
            <li>
              <a
                key={8}
                onClick={() => {handleLogout()}}
              >
                <span className="las la-clipboard-list">
                <LogoutOutlined />
                </span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        {currentActive === 1 ? (
          <>
            <Dashboard setCurrentActive={setCurrentActive}/>
          </>
        ) : currentActive === 2 ? (
          <>
            <AvailableBooks />
          </>
        ) : currentActive === 3 ? (
          <>
            <BorrowedBooks />
          </>
        ) : currentActive === 4 ? (
          <>
            <Shelf />
          </>
        ) : currentActive === 5 ? (
          <>
            <Inventory />
          </>
        ) : currentActive === 6 ? (
          <>
            <Reports />
          </>
        ) : currentActive === 7 ? (
          <>
            <Settings />
          </>
        ) : null}
      </div>
    </>
  );
};

export default HomeDashboard;
