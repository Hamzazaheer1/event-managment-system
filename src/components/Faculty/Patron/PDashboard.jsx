import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import custLogo from "../../images/CUST-Logo.png";
import EventsList from "./pages/EventsList";
import FHome from "./pages/FHome";
import GeneralInfo from "./pages/GeneralInfo";
import ManageEvents from "./pages/ManageEvents";
import ViewGallery from "../../Shared/ViewGallery";
import ManageBilling from "./pages/ManageBilling";

const data = [
  { id: 1, name: "Home" },
  { id: 2, name: "Manage Events" },
  { id: 3, name: "Manage Billing" },
  { id: 4, name: "Gallery" },
  { id: 5, name: "General Info" },
  { id: 6, name: "Events List" },
];

const PDashboard = () => {
  const Navigate = useNavigate();
  const [pageSelector, setPageSelector] = useState(1);
  const [drawer, setDrawer] = useState(false);

  const drawerHandler = () => {
    setDrawer(!drawer);
  };

  const signoutHandler = () => {
    if (localStorage.Patron) {
      localStorage.removeItem("Patron");
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
                    } 2xl:ml-3 2xl:block`}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* rightside */}
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
          {pageSelector === 1 && <FHome />}
          {pageSelector === 2 && <ManageEvents />}
          {pageSelector === 3 && <ManageBilling />}
          {pageSelector === 4 && <ViewGallery />}
          {pageSelector === 5 && <GeneralInfo />}
          {pageSelector === 6 && <EventsList />}
        </div>
      </div>
    </div>
  );
};

export default PDashboard;
