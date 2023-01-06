import React from "react";
import { useNavigate } from "react-router-dom";
import { cardData } from "./AuthData";
import custLogo from "../images/CUST-Logo.png";
import { useEffect } from "react";

const LoginDash = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.Student) {
      let login = localStorage.getItem("Student");
      if (login) {
        Navigate("/student-dashboard");
      }
    } else if (localStorage.Patron) {
      let login = localStorage.getItem("Patron");
      if (login) {
        Navigate("/Patron-dashboard");
      }
    } else if (localStorage.HOD) {
      let login = localStorage.getItem("HOD");
      if (login) {
        Navigate("/hod-dashboard");
      }
    } else if (localStorage.Dean) {
      let login = localStorage.getItem("Dean");
      if (login) {
        Navigate("/dean-dashboard");
      }
    } else if (localStorage.admin) {
      let login = localStorage.getItem("admin");
      if (login) {
        Navigate("/admin-dashboard");
      }
    }
  });

  return (
    <div>
      <div className="w-screen h-screen bg-gray-200 grid justify-items-center items-center">
        <img src={custLogo} alt="custlogo" className="w-52 2xl:w-52" />
        <div className="grid grid-cols-1 p-5 lg:gap-5 lg:justify-items-center">
          <h1 className="text-gray-800 text-2xl font-bold -mt-40 2xl:-mt-24">
            CUST Event Managment System
          </h1>
          <div className="flex flex-row gap-2">
            {cardData.map((item) => (
              <div
                key={item.id}
                className="w-64 2xl:w-52 hover:scale-105 duration-200 bg-gray-300 rounded-lg border border-gray-200 shadow-md cursor-pointer"
                onClick={() => {
                  if (item.id === 1) {
                    Navigate("/std-login");
                  } else if (item.id === 2) {
                    Navigate("/faculty-login");
                  } else if (item.id === 3) {
                    Navigate("/admin-login");
                  }
                }}
              >
                <img className="rounded-t-lg" src={item.image} alt="" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {item.cardName}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDash;
