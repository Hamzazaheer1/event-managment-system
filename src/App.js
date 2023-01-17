import React from "react";
import { Routes, Route } from "react-router-dom";
import SDashboard from "./components/Students/SDashboard";
import LoginDash from "./components/Authentication/LoginDash";
import Signup from "./components/Students/Signup/Signup";
import ForgetPassword from "./components/Shared/ForgotPassword/ForgetPassword";
import ChangePassword from "./components/Shared/ForgotPassword/ChangePassword";
import StudentLogin from "./components/Authentication/login-pages/StudentLogin";
import FacultyLogin from "./components/Authentication/login-pages/FacultyLogin";
import AdminLogin from "./components/Authentication/login-pages/AdminLogin";
import PDashboard from "./components/Faculty/Patron/PDashboard";
import HodDashboard from "./components/Faculty/HOD/HodDashboard";
import DeanDashboard from "./components/Faculty/Dean/DeanDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import PageNotFound from "./components/Shared/PageNotFound";
import Protected from "./components/Utils/Protected";
import Report from "./components/Shared/Report";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LoginDash />} />
        <Route path="/std-signup" element={<Signup />} />
        <Route path="/std-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgetpass" element={<ForgetPassword />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route path="/report/:id" element={<Report />} />

        <Route
          path="/student-dashboard"
          element={
            <Protected>
              <SDashboard />
            </Protected>
          }
        />
        <Route
          path="/patron-dashboard"
          element={
            <Protected>
              <PDashboard />
            </Protected>
          }
        />
        <Route
          path="/hod-dashboard"
          element={
            <Protected>
              <HodDashboard />
            </Protected>
          }
        />
        <Route
          path="/dean-dashboard"
          element={
            <Protected>
              <DeanDashboard />
            </Protected>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <Protected>
              <AdminDashboard />
            </Protected>
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
