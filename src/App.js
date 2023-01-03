import React, { useEffect, useState } from "react";
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

function App() {
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   if (localStorage.Student) {
  //     setUser("student");
  //   } else if (localStorage.admin) {
  //     setUser("admin");
  //   } else if (localStorage.Patron) {
  //     setUser("Patron");
  //   } else if (localStorage.HOD) {
  //     setUser("HOD");
  //   } else if (localStorage.Dean) {
  //     setUser("Dean");
  //   }
  // }, [user]);

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

        {/* {user === "student" && (
          
        )} */}
        <Route
          path="/student-dashboard"
          element={<Protected Component={SDashboard} />}
        />
        {/* {user === "Patron" && (
         
        )} */}
        <Route
          path="/patron-dashboard"
          element={<Protected Component={PDashboard} />}
        />
        <Route
          path="/hod-dashboard"
          element={<Protected Component={HodDashboard} />}
        />
        {/* {user === "HOD" && (
          
        )} */}
        {/* {user === "Dean" && (
          
        )} */}
        <Route
          path="/dean-dashboard"
          element={<Protected Component={DeanDashboard} />}
        />
        {/* {user === "admin" && (
         
        )} */}
        <Route
          path="/admin-dashboard"
          element={<Protected Component={AdminDashboard} />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
