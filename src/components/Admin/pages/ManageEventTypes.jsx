import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ManageEventTypes = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [eventtype, setEventType] = useState("");
  const [addEvent, setAddEvent] = useState(false);

  const handleClick = () => {
    setAddEvent(!addEvent);
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/societyandtypes/alleventtypes",
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        console.log("event types ", resp.data.data);
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        console.log(error);
        setResponse(null);
      }
    };

    apiHandler();
  }, [error, bearer]);

  const handleCreateSociety = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/societyandtypes/createtype",
        {
          eventtype,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      alert("Event Type added Sucessfully...");
    } catch (err) {
      console.log(err);
      alert("Error...");
    }
  };

  const handleDeleteSociety = async (id) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3001/api/v1/societyandtypes/deleteetypes/${id}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      alert("Event Type Deleted Sucessfully...");
      console.log(resp);
    } catch (err) {
      console.log(err);
      alert("Error...");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Events Types</h1>
      <div className="mt-10 relative">
        <button
          onClick={handleClick}
          className={` ${
            addEvent ? "ring-red-200" : "ring-red-100"
          } inline-block px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200`}
        >
          Add New Event Type
        </button>
        <div className=" pr-52">
          {addEvent && (
            <>
              <div className="mt-10 relative">
                <input
                  id="event-type"
                  type="text"
                  name="event-type"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-500"
                  placeholder="name"
                  onChange={(e) => setEventType(e.target.value)}
                />
                <label
                  for="event-type"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  New Event Type
                </label>
              </div>
              <button
                type="button"
                className="mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleCreateSociety}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>

      <div className=" bg-gray-100 rounded-lg">
        <h1 className="mt-6 p-5 text-2xl font-bold">Existing Event Types</h1>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Event Type
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {response &&
                response.map((item, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="py-4 px-6">{item.eventtype}</td>
                    <td
                      className="py-4 px-6 flex cursor-pointer hover:scale-110 duration-200"
                      onClick={handleClick}
                    >
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => {
                          handleDeleteSociety(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEventTypes;
