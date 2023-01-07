import React, { useState, useEffect } from "react";
import { AiOutlineCalendar, AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillNotification } from "react-icons/ai";
import { tabData } from "./Data/HomeData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const Home = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;
  const [openTab, setOpenTab] = useState(1);
  const [response, setResponse] = useState();
  const [notificationResponse, setNotificationResponse] = useState();
  const [count, setCount] = useState(0);

  const apiHandler = async (x) => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/v1/events/eventbydate/${x}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      setResponse(resp.data);
      setCount(4 - (resp.data.resultfree + resp.data.resultpaid));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/upcoming",
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        setNotificationResponse(resp.data);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, []);

  function convertDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">
        Welcome to Student Dashboard
      </h1>
      <div className="mt-12">
        <div className="flex flex-col">
          <ul className="flex space-x-2">
            {tabData &&
              tabData.map((item) => (
                <li key={item.id}>
                  <div
                    onClick={() => setOpenTab(item.id)}
                    className={` ${
                      openTab === item.id
                        ? "bg-red-500 text-white hover:bg-red-800"
                        : "text-gray-600 "
                    } inline-block px-4 py-2 rounded shadow uppercase cursor-pointer`}
                  >
                    {item.title}
                  </div>
                </li>
              ))}
          </ul>
          <div className="mt-62 xl:border rounded-lg">
            <div className={openTab === 1 ? "block" : "hidden"}>
              <h1 className="mb-4 mt-8 text-2xl font-bold ">Notifications</h1>
              {notificationResponse?.FreeEvents.map((item, index) => (
                <div
                  key={index + 1}
                  className="2xl:p-4 2xl:ml-96 2xl:mr-5 mb-4 border border-red-300 rounded-lg bg-red-300 "
                >
                  <div className="flex items-center">
                    <AiFillNotification className="w-5 h-5 mr-5 text-red-500 ml-1" />
                    {notificationResponse?.resultfree >= 1 ? (
                      <div className="flex flex-col p-2">
                        <h3 className="text-xl font-bold text-red-500 animate-pulse">
                          Event Name:{" "}
                          <span className="font-bold text-black no-underline">
                            {item.title}
                          </span>
                        </h3>
                        <h3 className="text-lg font-medium text-black">
                          Supervisor Name:{" "}
                          <span className="font-bold">
                            {item.supervisfacname}
                          </span>
                        </h3>
                        <h3 className="text-lg font-medium text-black">
                          Guest Speaker:{" "}
                          <span className="font-bold">
                            {item.guestspeakrname}
                          </span>
                        </h3>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
              {notificationResponse?.resultpaid > 0 ? (
                <h1 className="mb-4 mt-8 text-2xl font-bold ">
                  Paid Events Notifications
                </h1>
              ) : (
                ""
              )}
              {notificationResponse?.PaidEvents.map((item, index) => (
                <div
                  key={index}
                  className="2xl:p-4 2xl:ml-96 2xl:mr-5 mb-4 border border-red-300 rounded-lg bg-red-300 "
                >
                  <div className="flex items-center">
                    <AiFillNotification className="w-5 h-5 mr-5 text-red-500 ml-1" />
                    {notificationResponse?.resultpaid >= 1 ? (
                      <div className="flex flex-col p-2">
                        <h3 className="text-xl font-bold text-red-500 animate-pulse">
                          Event Name:{" "}
                          <span className="font-bold text-black no-underline">
                            {item.title}
                          </span>
                        </h3>
                        <h3 className="text-lg font-medium text-black">
                          Supervisor Name:{" "}
                          <span className="font-bold">
                            {item.supervisfacname}
                          </span>
                        </h3>
                        <h3 className="text-lg font-medium text-black">
                          Guest Speaker:{" "}
                          <span className="font-bold">
                            {item.guestspeakrname}
                          </span>
                        </h3>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              <h1 className="mb-4 mt-8 text-2xl font-bold ">Recent Events</h1>
              <div className="font-semibold mb-2">
                Remaining Slots: <span>{count}</span>
              </div>
              <Calendar onChange={apiHandler} className="hidden 2xl:block " />
              <div className="mt-10 grid gap-10 2xl:grid-cols-3">
                {response?.FreeEvents.length >= 1 &&
                  response?.FreeEvents.map((item, index) => (
                    <div
                      className="max-w-sm p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10"
                      key={index + 1}
                    >
                      <p className="mb-3 font-bold text-white">
                        Department of <span>{item.department}</span>
                      </p>
                      <p className="mb-3 font-bold text-black">
                        Event: <span>{item.title}</span>
                      </p>
                      <div className="text-black text-sm font-semibold">
                        <p className="mb-1  flex items-center gap-1">
                          <AiOutlineCalendar />
                          {convertDate(item.startdate)}
                        </p>
                        <p className="mb-1  flex items-center gap-1">
                          <AiFillClockCircle />
                          {item.duration}
                        </p>
                        <p className="mb-1  flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {item.proposedvenue}
                        </p>
                      </div>
                    </div>
                  ))}
                {response?.PaidEvents.length >= 1 &&
                  response?.PaidEvents.map((item, index) => (
                    <div
                      className="max-w-sm p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10"
                      key={index + 1}
                    >
                      <p className="mb-3 font-bold text-white">
                        Department of <span>{item.department}</span>
                      </p>
                      <p className="mb-3 font-bold text-black">
                        Event: <span>{item.title}</span>
                      </p>
                      <div className="text-black text-sm font-semibold">
                        <p className="mb-1  flex items-center gap-1">
                          <AiOutlineCalendar />
                          {convertDate(item.startdate)}
                        </p>
                        <p className="mb-1  flex items-center gap-1">
                          <AiFillClockCircle />
                          {item.duration}
                        </p>
                        <p className="mb-1  flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {item.proposedvenue}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
