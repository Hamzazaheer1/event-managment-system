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
  const [error, setError] = useState();

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
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        console.log(error);
        setResponse(null);
      }
    };

    apiHandler();
  }, [bearer, error]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Welcome to Admin's Dashboard
      </h1>
      <h1 className="mb-4 mt-10 text-2xl font-bold">Notifications</h1>
      <div className="mr-4 2xl:p-4 2xl:ml-96 2xl:mr-5 mb-4 border border-red-300 rounded-lg bg-red-300">
        <div className="flex items-center">
          <AiFillNotification className="w-5 h-5 mr-5 text-red-500" />
          {response && response.length >= 1 ? (
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-red-500 underline animate-pulse">
                New Notification
              </h3>
              <h3 className="text-lg font-medium text-black">
                Event notification pending. You can view them in{" "}
                <span className="text-red-500"> Manage Events</span> Section.
              </h3>
            </div>
          ) : (
            <div className="flex flex-col p-4">
              <h3 className="text-xl font-bold text-red-500 underline">
                No New Notification
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AHome;
