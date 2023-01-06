import React, { useState } from "react";
import custLogo from "../images/CUST-Logo.png";
import AHome from "./pages/AHome";
// import ApprovedEvents from "./pages/ApprovedEvents";
import GeneralInfo from "./pages/GeneralInfo";
import ManageEvents from "./pages/ManageEvents";
// import ManageEventTypes from "./pages/ManageEventTypes";
import ManageGallery from "./pages/ManageGallery";
import ManageSocietyNames from "./pages/ManageSocietyNames";
import RegisterFaculty from "./pages/RegisterFaculty";
import VerifyStudents from "./pages/VerifyStudents";
import ViewFaculty from "./pages/ViewFaculty";
import ViewStudents from "./pages/ViewStudents";
import { useNavigate } from "react-router-dom";

const data = [
  { id: 1, name: "Home" },
  // { id: 2, name: "Approved Events" },
  { id: 2, name: "Manage Events" },
  { id: 3, name: "Verify Student Accounts" },
  { id: 4, name: "Register Faculty" },
  { id: 5, name: "View All Faculty " },
  { id: 6, name: "Admin's General Info" },
  { id: 7, name: "View All Students" },
  { id: 8, name: "Manage Societies" },
  // { id: 9, name: "Manage Events Types" },
  { id: 9, name: "Manage Gallery" },
];

const DeanDashboard = () => {
  const [pageSelector, setPageSelector] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const Navigate = useNavigate();

  const drawerHandler = () => {
    setDrawer(!drawer);
  };

  const signoutHandler = () => {
    if (localStorage.admin) {
      localStorage.removeItem("admin");
    }
    Navigate("/");
  };

  return (
    <div className="grid grid-cols-12">
      <div
        onClick={drawerHandler}
        className={`${
          drawer === true ? "col-span-12" : "col-span-1"
        } 2xl:col-span-2`}
      >
        <div
          className="w-full sticky bottom-0 top-0 left-0 "
          aria-label="Sidebar"
        >
          <div className="h-screen  py-4 px-3 bg-white  ">
            <div className="flex justify-center">
              <img src={custLogo} alt={"custlogo"} className="w-40" />
            </div>
            <ul className="space-y-2 mt-10">
              {data.map((item) => (
                <li
                  className={` ${
                    pageSelector === item.id
                      ? "bg-red-500 text-white hover:bg-red-800"
                      : "text-gray-600 "
                  } cursor-pointer flex items-center p-2 text-base font-normal rounded-lg hover:bg-red-500 hover:text-white`}
                  onClick={() => {
                    setPageSelector(item.id);
                  }}
                >
                  <span
                    className={`${
                      drawer === true ? "block" : "hidden"
                    } 2xl:ml-3 2xl:block capitalize`}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-11 2xl:col-span-10 bg-gray-200 p-4">
        <nav className="bg-white px-2 sm:px-4 py-5  w-full z-20 top-0 border-b border-gray-200 rounded-lg shadow-gray-500 shadow-lg">
          <div className="container flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
                Welcome to CUST EMS
              </span>
            </div>

            <div className="flex md:order-2">
              <button
                className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={() => {
                  signoutHandler();
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </nav>
        <div className=" mt-10 ml-4">
          {pageSelector === 1 && <AHome />}
          {/* {pageSelector === 2 && <ApprovedEvents />} */}
          {pageSelector === 2 && <ManageEvents />}
          {pageSelector === 3 && <VerifyStudents />}
          {pageSelector === 4 && <RegisterFaculty />}
          {pageSelector === 5 && <ViewFaculty />}
          {pageSelector === 6 && <GeneralInfo />}
          {pageSelector === 7 && <ViewStudents />}
          {pageSelector === 8 && <ManageSocietyNames />}
          {/* {pageSelector === 9 && <ManageEventTypes />} */}
          {pageSelector === 9 && <ManageGallery />}
        </div>
      </div>
    </div>
  );
};

export default DeanDashboard;
