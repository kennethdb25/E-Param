import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginContext } from "./Context/Context";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import ROUTE from "./Routes/Route";
import HomeDashboard from "./components/DashBoard/Dashboard";
import LoginContent from "./components/StudentLogin/LoginContent";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import AdminLoginContent from "./components/AdminLogin/AdminLoginContent";
import LibrarianLoginContent from "./components/LibrarianLogin/LibrarianLoginContent";
import LibrarianForgotPassword from "./components/ForgotPassword/LibrarianForgotPassword";
import AdminForgotPassword from "./components/ForgotPassword/AdminForgotPassword";

function App() {
  const [data, setData] = useState("");
  const [newBooks, setNewBooks] = useState();
  const [section, setSection] = useState();
  const [announcement, setAnnouncement] = useState();
  const [activeAnnouncement, setActiveAnnouncement] = useState();
  const [bookRatingsData, setBookRatingsData] = useState();
  const [borrowedRatingsData, setBorrowedRatingsData] = useState();
  // eslint-disable-next-line no-unused-vars
  const { loginData, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const sectiionData = async () => {
    const data = await fetch("/get-all-section", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setSection(res.body);
  };

  const announcementData = async () => {
    const data = await fetch("/get-announcement", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setAnnouncement(res.body);
  };

  const activeAnnouncementData = async () => {
    const data = await fetch("/get-active-announcement", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setActiveAnnouncement(res.body);
  };

  const bookRatingsChart = async () => {
    const data = await fetch("/book-graph-ratings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setBookRatingsData(res.body);
  };

  const borrowedRatingsChart = async () => {
    const data = await fetch("/book-borrowed-ratings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setBorrowedRatingsData(res.body);
  };

  const LoginValid = async () => {
    if (localStorage.getItem("studentToken")) {
      let validToken = localStorage.getItem("studentToken");
      const res = await fetch("/student/valid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: validToken,
        },
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        console.log(data.error);
      } else {
        console.log("Verified User");
        setLoginData(data);
        history("/dashboard");
      }
    } else if (localStorage.getItem("librarianToken")) {
      let validToken = localStorage.getItem("librarianToken");
      const res = await fetch("/librarian/valid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: validToken,
        },
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        console.log(data.error);
      } else {
        console.log("Verified User");
        setLoginData(data);
        history("/dashboard");
      }
    } else if (localStorage.getItem("adminToken")) {
      let validToken = localStorage.getItem("adminToken");
      const res = await fetch("/admin/valid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: validToken,
        },
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        console.log(data.error);
      } else {
        console.log("Verified User");
        setLoginData(data);
        history("/dashboard");
      }
    } else {
      setData(true);
    }
  };

  const getNewBooks = async () => {
    const res = await fetch("/book/get-new", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await res.json();
    setNewBooks(newData);
  };

  useEffect(() => {
    setTimeout(() => {
      LoginValid();
      sectiionData();
      announcementData();
      activeAnnouncementData();
      bookRatingsChart();
      borrowedRatingsChart();
    }, 3000);
    setTimeout(() => {
      setData(true);
    }, 3000);
    getNewBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ToastContainer />
      {data ? (
        <>
          <Routes>
            <Route
              path={ROUTE.HOMEPAGE}
              element={<LoginContent LoginValid={LoginValid} />}
            />
            <Route
              path={ROUTE.DASHBOARD}
              element={
                <HomeDashboard
                  newBooks={newBooks}
                  section={section}
                  sectiionData={sectiionData}
                  announcement={announcement}
                  announcementData={announcementData}
                  activeAnnouncement={activeAnnouncement}
                  activeAnnouncementData={activeAnnouncementData}
                  bookRatingsChart={bookRatingsChart}
                  bookRatingsData={bookRatingsData}
                  borrowedRatingsChart={borrowedRatingsChart}
                  borrowedRatingsData={borrowedRatingsData}
                />
              }
            />
            <Route path={ROUTE.FORGOTPASSWORD} element={<ForgotPassword />} />
            <Route
              path={ROUTE.LIBRARIANLOGINPAGE}
              element={<LibrarianLoginContent LoginValid={LoginValid} />}
            />
            <Route
              path={ROUTE.LIBRARIANFORGOTPASS}
              element={<LibrarianForgotPassword />}
            />
            <Route
              path={ROUTE.ADMINLOGINPAGE}
              element={<AdminLoginContent LoginValid={LoginValid} />}
            />
            <Route
              path={ROUTE.ADMINFORGOTPASS}
              element={<AdminForgotPassword />}
            />
          </Routes>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading Portal &nbsp;
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default App;
