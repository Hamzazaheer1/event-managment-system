import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { AiFillNotification } from "react-icons/ai";
import { tabData } from "./Data/HomeData";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import EventImage from "../../images/event.jpg";

const Home = () => {
  const [date, setDate] = useState();
  const [openTab, setOpenTab] = useState(1);
  const [response, setResponse] = useState();
  const [notificationResponse, setNotificationResponse] = useState();
  const [notificationError, setNotificationError] = useState();
  const [error, setError] = useState();
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;

  const onChange = (date) => {
    setDate(date);
    console.log("g", date);
    apiHandler();
  };

  const apiHandler = async () => {
    console.log("actual date", date);
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/v1/events/eventbydate/${date}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp.data.data);
      setResponse(resp.data.data);
      setError(null);
    } catch (err) {
      setError(err);
      setResponse(null);
      console.log(error);
    }
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/upcoming"
        );
        setNotificationResponse(resp.data.data);
        setNotificationError(null);
      } catch (err) {
        setNotificationError(err);
        setNotificationResponse(null);
        console.log(notificationError);
      }
    };

    apiHandler();
  }, [notificationError]);

  console.log("notification", notificationResponse);

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
              {notificationResponse &&
                notificationResponse.map((item) => (
                  <div className="2xl:p-4 2xl:ml-96 2xl:mr-5 mb-4 border border-red-300 rounded-lg bg-red-300 ">
                    <div className="flex items-center">
                      <AiFillNotification className="w-5 h-5 mr-5 text-red-500" />
                      {notificationResponse &&
                      notificationResponse.length >= 1 ? (
                        <div className="flex flex-col">
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
                        <div className="flex flex-col p-4">
                          <h3 className="text-xl font-bold text-red-900 underline">
                            No New Notification
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              <h1 className="mb-4 mt-8 text-2xl font-bold ">Recent Events</h1>
              <Calendar
                onChange={onChange}
                value={date}
                className="hidden 2xl:block "
              />
              <div className="mt-10 grid gap-10 2xl:grid-cols-3">
                {response &&
                  response.map((item, index) => (
                    <div
                      key={index + 1}
                      className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row max-w-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="object-cover h-40 w-40 rounded-t-lg  md:rounded-none md:rounded-l-lg"
                        src={EventImage}
                        alt="cardimage"
                      />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {item.startdate}
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
