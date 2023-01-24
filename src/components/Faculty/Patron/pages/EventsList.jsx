import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { FcApproval, FcCancel } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import AllApprovedPaidEvents from "./AllApprovedPaidEvents";
import { useNavigate } from "react-router-dom";
import Report from "../../../Shared/Report";

const EventsList = () => {
  let jwt;
  if (localStorage.Patron) {
    jwt = localStorage.getItem("Patron");
  }
  const Navigate = useNavigate();
  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [toggle, setToggle] = useState(true);
  const [eventSelector, setEventSelector] = useState(false);
  const [eventID, setEventId] = useState(0);
  const [singleEvent, setSingleEvent] = useState();

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/getalleventsbyfacultyapproved",
          {
            headers: {
              authorization: bearer,
            },
          }
        );

        console.log(resp.data);
        setResponse(resp.data.FreeEvents);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
        console.log(error);
      }
    };

    apiHandler();
  }, [bearer, error]);

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
      toast.error(err.response.data.message);
    }
  };

  const handlePrint = () => {
    Navigate(`/report/${eventID}`);
  };

  return (
    <div className=" bg-gray-100 shadow-lg rounded-lg">
      <h1 className="p-5 text-2xl font-bold">All Events List</h1>

      <div className="text-sm font-medium text-center border-b  text-gray-400 border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <span
              className={`${
                toggle === true
                  ? "cursor-pointer inline-block p-4  border-b-2 rounded-t-lg active text-red-500 border-red-500"
                  : "cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
              }`}
              onClick={() => {
                setToggle(true);
              }}
            >
              Paid Events
            </span>
          </li>
          <li className="mr-2">
            <span
              className={`${
                toggle === false
                  ? "cursor-pointer inline-block p-4  border-b-2 rounded-t-lg active text-red-500 border-red-500"
                  : "cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
              }`}
              onClick={() => {
                setToggle(false);
              }}
            >
              Simple Events
            </span>
          </li>
        </ul>
      </div>
      {!toggle && (
        <>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-red-200 ">
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
                {response &&
                  response.map((item, index) => (
                    <tr
                      key={index + 1}
                      className="bg-gray-200 border-b  hover:bg-gray-50 "
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
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
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
          {/* model */}
          <div
            id="defaultModal"
            tabindex="-1"
            aria-hidden="true"
            className={`${
              eventSelector ? " " : "hidden"
            }  overflow-y-auto overflow-x-hidden 2xl:fixed right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full grid justify-items-center`}
          >
            <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex justify-between items-start p-4 rounded-t border-b ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Event Details
                  </h3>
                  <button
                    onClick={() => {
                      setEventSelector(!eventSelector);
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
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
                    <div className="bg-gray-200 text-gray-900 font-semibold p-2 grid gap-2 ">
                      <p className="leading-relaxed text-xl  ">
                        Title:
                        <span className="pl-3 text-gray-600">
                          {singleEvent.title}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        Date:{" "}
                        <span className="pl-3 text-gray-600">
                          {singleEvent.createdAt}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        Proposed Venue:{" "}
                        <span className="pl-3 text-gray-600">
                          {singleEvent.proposedvenue}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        Duration:{" "}
                        <span className="pl-3 text-gray-600">
                          {singleEvent.duration}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        Supervisor Name:{" "}
                        <span className="pl-3 text-gray-600">
                          {singleEvent.supervisfacname}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        Guest Speaker:{" "}
                        <span className="pl-3 text-gray-600">
                          {singleEvent.guestspeakrname}
                        </span>
                      </p>
                    </div>
                    <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                      Student Details
                    </h1>
                    <div className="bg-gray-200 p-2 grid gap-2 ">
                      {singleEvent.student.length >= 1 ? (
                        singleEvent.student.map((item) => (
                          <div className="grid grid-cols-3 text-gray-900 font-semibold">
                            <p className="leading-relaxed text-xl ">
                              Name
                              <span className="pl-3 text-gray-600">
                                {item.stdname}
                              </span>
                            </p>
                            <p className="leading-relaxed text-xl  ">
                              RegNo.
                              <span className="pl-3 text-gray-600">
                                {item.stdregno}
                              </span>
                            </p>
                            <p className="leading-relaxed text-xl  ">
                              Role
                              <span className="pl-3 text-gray-600">
                                {item.stdrole}
                              </span>
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="grid text-gray-800 grid-cols-3">
                          <p className="leading-relaxed  text-xl  ">
                            Name
                            <span className="pl-3 text-gray-600">
                              {singleEvent.student.stdname}
                            </span>
                          </p>
                          <p className="leading-relaxed  text-xl  ">
                            RegNo.
                            <span className="pl-3 text-gray-600">
                              {singleEvent.student.stdregno}
                            </span>
                          </p>
                          <p className="leading-relaxed  text-xl  ">
                            Role
                            <span className="pl-3 text-gray-600">
                              {singleEvent.student.stdrole}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                      Contact Person's Details
                    </h1>
                    <div className="grid grid-cols-3 bg-gray-200 p-2 gap-2 text-gray-800 font-semibold">
                      <p className="leading-relaxed  text-xl  ">
                        MobileNo:
                        <span className="pl-3 text-gray-600">
                          {singleEvent.contctpersonmobile}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        RegNo:
                        <span className="pl-3 text-gray-600">
                          {singleEvent.contctpersonregno}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  ">
                        Name:
                        <span className="pl-3 text-gray-600">
                          {singleEvent.contctprsnname}
                        </span>
                      </p>
                    </div>
                    <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                      Other Requirements
                    </h1>
                    <div className="grid grid-cols-3 bg-gray-200 font-semibold text-gray-800 p-2 gap-2">
                      <p className="leading-relaxed  text-xl flex ">
                        Sashes:{" "}
                        <span className="pl-3 text-gray-400">
                          {singleEvent.sashes === true ? (
                            <FcApproval className=" w-10 h-8 " />
                          ) : (
                            <FcCancel className=" w-10 h-8 " />
                          )}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl flex ">
                        Panaflex:{" "}
                        <span className="pl-3 text-gray-400">
                          {singleEvent.panaflex === true ? (
                            <FcApproval className=" w-10 h-8 " />
                          ) : (
                            <FcCancel className=" w-10 h-8 " />
                          )}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl flex  ">
                        Media Coverage:{" "}
                        <span className="pl-3 text-gray-400">
                          {singleEvent.mediacoverage === true ? (
                            <FcApproval className=" w-10 h-8 " />
                          ) : (
                            <FcCancel className=" w-10 h-8 " />
                          )}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl  flex">
                        Refreshments:{" "}
                        <span className="pl-3 text-gray-400">
                          {singleEvent.refreshments === true ? (
                            <FcApproval className=" w-10 h-8 " />
                          ) : (
                            <FcCancel className=" w-10 h-8 " />
                          )}
                        </span>
                      </p>
                      <p className="leading-relaxed  text-xl flex ">
                        Transport:{" "}
                        <span className="pl-3 text-gray-400">
                          {singleEvent.transport === true ? (
                            <FcApproval className=" w-10 h-8 " />
                          ) : (
                            <FcCancel className=" w-10 h-8 " />
                          )}
                        </span>
                      </p>
                      <p className="leading-relaxed text-xl flex  ">
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
                    <p className="leading-relaxed text-white text-xl bg-gray-200 font-semibold p-2 flex">
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

                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => {
                      handlePrint();
                    }}
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
        </>
      )}

      {toggle && <AllApprovedPaidEvents />}
    </div>
  );
};

export default EventsList;
