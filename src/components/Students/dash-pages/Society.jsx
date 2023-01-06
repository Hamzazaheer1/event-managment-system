import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AiOutlineCaretDown } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { FcApproval, FcCancel } from "react-icons/fc";

const Society = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;
  const [eventToggle, setEventToggle] = useState(false);
  const [response, setResponse] = useState();
  const [eventResponse, setEventResponse] = useState();
  const [error, setError] = useState();
  const [eventSelector, setEventSelector] = useState(false);
  const [eventID, setEventId] = useState(0);
  const [singleEvent, setSingleEvent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleEventClick = () => {
    setEventToggle(!eventToggle);
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/societyandtypes/allsocites"
        );
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
        console.log(error);
      }
    };
    apiHandler();
  }, [error]);

  const handleGetEventbySociety = async (name) => {
    setIsLoading(true);
    handleEventClick();
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/v1/events/eventbysociety/${name}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log("event response", resp.data.data.event);
      setEventResponse(resp.data.data.event);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Error...");
      setIsLoading(false);
    }
  };

  const handleSingleEvent = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/v1/events/oneevent/${eventID}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      setSingleEvent(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold ">Societies</h1>
      <p className="text-gray-600">
        Select a Society first to its display{" "}
        <span className="text-red-400 font-bold">Approved</span> Events.
      </p>
      <div className="mt-5 mb-6 w-full group">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={handleEventClick}
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              List of Societies
              <AiOutlineCaretDown className="-mr-1 ml-2 h-5 w-5" />
            </button>
          </div>
          {eventToggle && (
            <div
              className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="py-1" role="none">
                {response &&
                  response.map((item, index) => (
                    <div
                      key={index + 1}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-red-500 cursor-pointer"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                      onClick={() => {
                        handleGetEventbySociety(item.society);
                      }}
                    >
                      {item.society}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" bg-gray-100 ">
        <h1 className=" p-5 text-2xl font-bold">List of Event by Society</h1>
        {isLoading ? (
          <div role="status" className="flex justify-center pb-10">
            <svg
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin  fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Title
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Supervisor Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Student Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Student Contact No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Created At
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventResponse &&
                    eventResponse.map((item, index) => (
                      <tr
                        key={index + 1}
                        className="bg-white border-b  hover:bg-gray-50 "
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {item.title}
                        </th>
                        <td className="py-4 px-6">{item.supervisfacname}</td>
                        <td className="py-4 px-6">{item.contctpersonregno}</td>
                        <td className="py-4 px-6">{item.contctpersonmobile}</td>
                        <td className="py-4 px-6">{item.createdAt}</td>
                        <td className="py-4 px-6 flex cursor-pointer hover:scale-110 duration-200">
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                              setEventId(item.id);
                              setEventSelector(!eventSelector);
                            }}
                          >
                            View Detailed Info
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div
              id="defaultModal"
              tabindex="-1"
              aria-hidden="true"
              className={`${
                eventSelector ? " " : "hidden"
              }  overflow-y-auto overflow-x-hidden 2xl:fixed right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full grid justify-items-center`}
            >
              <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Event Details
                    </h3>
                    <button
                      onClick={() => {
                        setEventSelector(!eventSelector);
                      }}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="defaultModal"
                    >
                      <ImCross />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <button
                    onClick={handleSingleEvent}
                    className="m-2 ml-4 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Show Details
                  </button>
                  {singleEvent && (
                    <div className="p-6 space-y-6">
                      <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                        Basic Information
                      </h1>
                      <div className="bg-gray-800 p-2 grid gap-2 ">
                        <p className="leading-relaxed text-white text-xl  ">
                          Title:
                          <span className="pl-3 text-gray-400">
                            {singleEvent.title}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Date:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.createdAt}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Proposed Venue:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.proposedvenue}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Duration:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.duration}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Supervisor Name:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.supervisfacname}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Guest Speaker:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.guestspeakrname}
                          </span>
                        </p>
                      </div>
                      <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                        Student Details
                      </h1>
                      <div className="bg-gray-800 p-2 grid gap-2 ">
                        {singleEvent.student.length > 1 ? (
                          singleEvent.student.map((item) => (
                            <div className="grid grid-cols-3">
                              <p className="leading-relaxed text-white text-xl  ">
                                Name
                                <span className="pl-3 text-gray-400">
                                  {item.stdname}
                                </span>
                              </p>
                              <p className="leading-relaxed text-white text-xl  ">
                                RegNo.
                                <span className="pl-3 text-gray-400">
                                  {item.stdregno}
                                </span>
                              </p>
                              <p className="leading-relaxed text-white text-xl  ">
                                Role
                                <span className="pl-3 text-gray-400">
                                  {item.stdrole}
                                </span>
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="grid grid-cols-3">
                            <p className="leading-relaxed text-white text-xl  ">
                              Name
                              <span className="pl-3 text-gray-400">
                                {singleEvent.student.stdname}
                              </span>
                            </p>
                            <p className="leading-relaxed text-white text-xl  ">
                              RegNo.
                              <span className="pl-3 text-gray-400">
                                {singleEvent.student.stdregno}
                              </span>
                            </p>
                            <p className="leading-relaxed text-white text-xl  ">
                              Role
                              <span className="pl-3 text-gray-400">
                                {singleEvent.student.stdrole}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                      <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                        Contact Person's Details
                      </h1>
                      <div className="grid grid-cols-3 bg-gray-800 p-2 gap-2">
                        <p className="leading-relaxed text-white text-xl  ">
                          Contact Person Mobile No:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.contctprsnname}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Contact Person Registration No:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.contctpersonregno}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  ">
                          Contact Person Name:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.contctpersonmobile}
                          </span>
                        </p>
                      </div>
                      <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                        Other Requirements
                      </h1>
                      <div className="grid grid-cols-3 bg-gray-800 p-2 gap-2">
                        <p className="leading-relaxed text-white text-xl flex ">
                          Sashes:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.sashes === true ? (
                              <FcApproval className=" w-10 h-8 " />
                            ) : (
                              <FcCancel className=" w-10 h-8 " />
                            )}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl flex ">
                          Panaflex:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.panaflex === true ? (
                              <FcApproval className=" w-10 h-8 " />
                            ) : (
                              <FcCancel className=" w-10 h-8 " />
                            )}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl flex  ">
                          Media Coverage:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.mediacoverage === true ? (
                              <FcApproval className=" w-10 h-8 " />
                            ) : (
                              <FcCancel className=" w-10 h-8 " />
                            )}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl  flex">
                          Refreshments:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.refreshments === true ? (
                              <FcApproval className=" w-10 h-8 " />
                            ) : (
                              <FcCancel className=" w-10 h-8 " />
                            )}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl flex ">
                          Transport:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.transport === true ? (
                              <FcApproval className=" w-10 h-8 " />
                            ) : (
                              <FcCancel className=" w-10 h-8 " />
                            )}
                          </span>
                        </p>
                        <p className="leading-relaxed text-white text-xl flex  ">
                          Shield:{" "}
                          <span className="pl-3 text-gray-400">
                            {singleEvent.shield === true ? (
                              <FcApproval className=" w-10 h-8 " />
                            ) : (
                              <FcCancel className=" w-10 h-8 " />
                            )}
                          </span>
                        </p>
                      </div>
                      <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                        Your Approval Status
                      </h1>
                      <p className="leading-relaxed text-white text-xl bg-gray-800 p-2 flex">
                        Your Approval Status:
                        <span className="pl-3 text-gray-400">
                          {singleEvent.isPatronApproved === true ? (
                            <FcApproval className=" w-10 h-8 " />
                          ) : (
                            <FcCancel className=" w-10 h-8 " />
                          )}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Society;
