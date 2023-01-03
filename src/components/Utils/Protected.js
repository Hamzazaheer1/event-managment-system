import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const Navigate = useNavigate();
  useCallback(() => {
    if (localStorage.getItem("Student")) {
      Navigate("/student-dashboard");
    } else if (localStorage.getItem("Patron")) {
      Navigate("/Patron-dashboard");
    } else if (localStorage.getItem("HOD")) {
      Navigate("/hod-dashboard");
    } else if (localStorage.getItem("Dean")) {
      Navigate("/dean-dashboard");
    } else if (localStorage.getItem("admin")) {
      Navigate("/admin-dashboard");
    }
  }, [Navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
