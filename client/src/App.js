
import './App.css';
import { Routes, Route } from "react-router-dom";
import ROUTE from './Routes/Route';
import StudentDashboard from './components/DashBoard/StudentDashboard';
import LoginContent from './components/StudentLogin/LoginContent';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AdminLoginContent from './components/AdminLogin/AdminLoginContent';

function App() {
  return (
    <div>
      <Routes>
        <Route path={ROUTE.HOMEPAGE} element={<LoginContent />} />
        <Route path={ROUTE.STUDENTDASHBOARD} element={<StudentDashboard />} />
        <Route path={ROUTE.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE.ADMINLOGINPAGE} element={<AdminLoginContent />} />
      </Routes>
    </div>
  );
}

export default App;
