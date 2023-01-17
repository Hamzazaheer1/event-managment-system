import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  if (localStorage.getItem("Student")) {
    return children;
  } else if (localStorage.getItem("Patron")) {
    return children;
  } else if (localStorage.getItem("HOD")) {
    return children;
  } else if (localStorage.getItem("Dean")) {
    return children;
  } else if (localStorage.getItem("admin")) {
    return children;
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default Protected;
