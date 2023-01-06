import React, { useState } from "react";
import Home from "./dash-pages/Home";
import OrganizeEvent from "./dash-pages/OrganizeEvent";
import YourEvents from "./dash-pages/YourEvents";
// import Society from "./dash-pages/Society";
import UpcomingEvents from "./dash-pages/UpcomingEvents";
import custLogo from "../images/CUST-Logo.png";
import GeneralInfo from "./dash-pages/GeneralInfo";
import { useNavigate } from "react-router-dom";
import ViewGallery from "../Shared/ViewGallery";
import UpcomingPaidEvents from "./dash-pages/UpcommingPaidEvents";
import RegisterRequests from "./dash-pages/RegisterRequests";

const SDashboard = () => {
  const [pageSelector, setPageSelector] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const Navigate = useNavigate();

  const drawerHandler = () => {
    setDrawer(!drawer);
  };

  const signoutHandler = () => {
    if (localStorage.Student) {
      localStorage.removeItem("Student");
    }
    Navigate("/");
  };

  const data = [
    {
      id: 1,
      name: "home",
    },
    {
      id: 2,
      name: "organize event",
    },
    {
      id: 3,
      name: "your events",
    },
    // { id: 4, name: "society" },
    { id: 4, name: "upcoming paid events" },
    { id: 5, name: "upcoming events" },
    { id: 6, name: "register requests" },
    { id: 7, name: "gallery" },
    { id: 8, name: "profile" },
  ];

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
                  key={item.id}
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
          {pageSelector === 1 && <Home />}
          {pageSelector === 2 && <OrganizeEvent />}
          {pageSelector === 3 && <YourEvents />}
          {/* {pageSelector === 4 && <Society />} */}
          {pageSelector === 4 && <UpcomingPaidEvents />}
          {pageSelector === 5 && <UpcomingEvents />}
          {pageSelector === 6 && <RegisterRequests />}
          {pageSelector === 7 && <ViewGallery />}
          {pageSelector === 8 && <GeneralInfo />}
        </div>
      </div>
    </div>
  );
};

export default SDashboard;
