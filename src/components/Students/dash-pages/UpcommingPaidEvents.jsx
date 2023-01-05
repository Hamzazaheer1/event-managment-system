import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineCalendar, AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const UpcomingPaidEvents = () => {
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
        {response?.PaidEvents.length >= 1 &&
          response?.PaidEvents.map((item, index) => (
            <div
              class="w-[20rem] p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10"
              key={index + 1}
            >
              <p class="mb-3 font-bold text-white">
                Department of <span>{item.department}</span>
              </p>
              <p class="mb-3 font-bold text-black">
                Event: <span>{item.title}</span>
              </p>
              <div className="text-black text-sm font-semibold">
                <p class="mb-1  flex items-center gap-1">
                  <AiOutlineCalendar />
                  {convertDate(item.startdate)}
                </p>
                <p class="mb-1  flex items-center gap-1">
                  <AiFillClockCircle />
                  {item.duration}
                </p>
                <p class="mb-1  flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {item.proposedvenue}
                </p>
              </div>
              <hr class="border-black mt-4" />
              <p className="w-max mx-auto mt-2 font-bold text-black cursor-pointer hover:underline ">
                Register Now
              </p>
            </div>
          ))}
      </div>
      {/* <div class="max-w-sm p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10">
        <p class="mb-3 font-bold text-white">Department of CS</p>
        <p class="mb-3 font-bold text-black">Event: Gaming Competition</p>
        <div className="text-black text-sm font-semibold">
          <p class="mb-1  flex items-center gap-1">
            <AiOutlineCalendar />
            Mon, 10-20-2022
          </p>
          <p class="mb-1  flex items-center gap-1">
            <AiFillClockCircle />
            Mon, 10-20-2022
          </p>
          <p class="mb-1  flex items-center gap-1">
            <FaMapMarkerAlt />
            Mon, 10-20-2022
          </p>
        </div>
        <hr class="border-black mt-4" />
        <p className="w-max mx-auto mt-2 font-bold text-black cursor-pointer hover:underline ">
          Register Now
        </p>
      </div> */}
    </div>
  );
};

export default UpcomingPaidEvents;
