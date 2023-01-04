import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EventImage from "../../images/event.jpg";
import { AiOutlineCalendar, AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const UpcomingEvents = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/upcoming"
        );
        console.log(resp.data.data);
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
        // alert(error);
      }
    };
    apiHandler();
  }, [error]);

  const handleDate = (item) => {
    let exDate = item.toString();
    let date = new Date(exDate);
    let x = date.toDateString();
    return x;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Upcoming Events in CUST</h1>
      <p className="text-gray-500 pl-1">
        Find a list of upcoming events in cust.{" "}
      </p>
      {/* <div className=" bg-white border mt-12 flex flex-col">
        {response ? (
          response.map((item, index) => (
            <div className="block mb-4">
              <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-l hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="object-cover w-56 h-40 rounded-t-lg rounded-b-lg "
                  src={EventImage}
                  alt=""
                />

                <div
                  key={index + 1}
                  className="flex flex-col justify-between p-4 leading-normal"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {item.title}
                  </h5>
                  <p className="mb-3 text-white font-bold">
                    <span className="font-normal text-gray-400">
                      Supervisor Name:{" "}
                    </span>{" "}
                    {item.supervisfacname}
                  </p>
                  <p className="mb-3 font-normal text-rose-400">
                    {handleDate(item.startdate)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-white">No Upcomming Events found.</h1>
        )}
      </div> */}

      <div class="max-w-sm p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10">
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
      </div>
    </div>
  );
};

export default UpcomingEvents;
