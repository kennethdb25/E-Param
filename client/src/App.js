
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginContext } from "./Context/Context";
import './App.css';
import ROUTE from './Routes/Route';
import HomeDashboard from './components/DashBoard/Dashboard';
import LoginContent from './components/StudentLogin/LoginContent';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AdminLoginContent from './components/AdminLogin/AdminLoginContent';
import LibrarianLoginContent from './components/LibrarianLogin/LibrarianLoginContent';

function App() {
  const { loginData, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const LoginValid = async () => {
    if (localStorage.getItem("studentToken")) {
      let validToken = localStorage.getItem("studentToken");
      const res = await fetch("/student/valid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: validToken,
        }
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        console.log(data.error);
      } else {
        console.log("Verified User");
        setLoginData(data);
        history("/dashboard");
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      LoginValid();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Routes>
        <Route path={ROUTE.HOMEPAGE} element={<LoginContent />} />
        <Route path={ROUTE.DASHBOARD} element={<HomeDashboard />} />
        <Route path={ROUTE.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE.LIBRARIANLOGINPAGE} element={<LibrarianLoginContent />} />
        <Route path={ROUTE.ADMINLOGINPAGE} element={<AdminLoginContent />} />
      </Routes>
    </div>
  );
}

export default App;
