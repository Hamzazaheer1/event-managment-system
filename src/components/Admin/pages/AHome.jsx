import React, { useState, useEffect } from "react";
import { AiFillNotification } from "react-icons/ai";
import axios from "axios";

const AHome = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/pendingAdmin",
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        setResponse(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, [bearer]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Welcome to Admin's Dashboard
      </h1>
      <h1 className="mb-4 mt-10 text-2xl font-bold">Notifications</h1>
      <div className="mt-62 xl:border rounded-lg">
        {response?.FreeEvents.map((item, index) => (
          <div
            key={index + 1}
            className="2xl:p-4 2xl:ml-96 2xl:mr-5 mb-4 border border-red-300 rounded-lg bg-red-300 "
          >
            <div className="flex items-center">
              <AiFillNotification className="w-5 h-5 mr-5 text-red-500 ml-1" />
              {response?.resultfree >= 1 ? (
                <div className="flex flex-col p-2">
                  <h3 className="text-xl font-bold text-red-500 animate-pulse">
                    Event Name:{" "}
                    <span className="font-bold text-black no-underline">
                      {item.title}
                    </span>
                  </h3>
                  <h3 className="text-lg font-medium text-black">
                    Supervisor Name:{" "}
                    <span className="font-bold">{item.supervisfacname}</span>
                  </h3>
                  <h3 className="text-lg font-medium text-black">
                    Guest Speaker:{" "}
                    <span className="font-bold">{item.guestspeakrname}</span>
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        {response?.resultpaid > 0 ? (
          <h1 className="mb-4 mt-8 text-2xl font-bold ">New Paid Events</h1>
        ) : (
          ""
        )}
        {response?.PaidEvents.map((item, index) => (
          <div
            key={index}
            className="2xl:p-4 2xl:ml-96 2xl:mr-5 mb-4 border border-red-300 rounded-lg bg-red-300 "
          >
            <div className="flex items-center">
              <AiFillNotification className="w-5 h-5 mr-5 text-red-500 ml-1" />
              {response?.resultpaid >= 1 ? (
                <div className="flex flex-col p-2">
                  <h3 className="text-xl font-bold text-red-500 animate-pulse">
                    Event Name:{" "}
                    <span className="font-bold text-black no-underline">
                      {item.title}
                    </span>
                  </h3>
                  <h3 className="text-lg font-medium text-black">
                    Supervisor Name:{" "}
                    <span className="font-bold">{item.supervisfacname}</span>
                  </h3>
                  <h3 className="text-lg font-medium text-black">
                    Guest Speaker:{" "}
                    <span className="font-bold">{item.guestspeakrname}</span>
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AHome;
