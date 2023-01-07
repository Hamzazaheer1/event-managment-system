import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineCalendar, AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const UpcomingEvents = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();

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

        setResponse(resp.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
        // alert(error);
      }
    };
    apiHandler();
  }, [error]);

  function convertDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Upcoming Events in CUST</h1>
      <div className="grid grid-cols-4">
        {response?.FreeEvents.length >= 1 &&
          response?.FreeEvents.map((item, index) => (
            <div
              className="w-[20rem] p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10"
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
  );
};

export default UpcomingEvents;
