import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { FcApproval, FcCancel } from "react-icons/fc";
import PaidEvents from "./PaidEvents";

const ManageEvents = () => {
  let jwt;
  if (localStorage.Patron) {
    jwt = localStorage.getItem("Patron");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [eventSelector, setEventSelector] = useState(false);
  const [eventID, setEventId] = useState(0);
  const [singleEvent, setSingleEvent] = useState();
  const [toggle, setToggle] = useState(true);
  const [feedback, setFeedback] = useState("");

  function convertDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/pendingpatron",
          {
            headers: {
              authorization: bearer,
            },
          }
        );

        setResponse(resp.data.FreeEvents);
        console.log(resp.data.FreeEvents);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
        console.log(error);
      }
    };

    apiHandler();
  }, [bearer, error, response]);

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
      console.log("single ", resp.data.data);
    } catch (err) {
      console.log(err);
      alert("Error...");
    }
  };

  const handleApproveEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/events/approvepatron/${eventID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      console.log(response);
      alert("Event Approved Sucessfully..");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectedEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/events/delete/${eventID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: {
            message: feedback,
          },
        }
      );
      console.log(response);

      alert("Event Rejected Sucessfully..");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-gray-100 shadow-lg rounded-lg">
      <h1 className="p-5 text-2xl font-bold">Unverified Events List</h1>
      <div class="text-sm font-medium text-center border-b  text-gray-400 border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
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
          <li class="mr-2">
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
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    Feedbacks
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.title}
                      </th>
                      <td className="py-4 px-6">{item.supervisfacname}</td>
                      <td className="py-4 px-6">{item.contctpersonregno}</td>
                      <td className="py-4 px-6">{item.contctpersonmobile}</td>
                      <td className="py-4 px-6">
                        {convertDate(item.createdAt)}
                      </td>
                      <td className="py-4 px-6">
                        {item.feedback?.map((item) => (
                          <tr>
                            {item.message}
                            <br />
                            <span className="text-red-500">
                              {item.user.name}
                            </span>
                          </tr>
                        ))}
                      </td>
                      <td className="py-4 px-6 flex cursor-pointer hover:scale-110 duration-200">
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          onClick={() => {
                            setEventId(item.id);
                            setEventSelector(!eventSelector);
                          }}
                        >
                          Action
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
                  Show Details (press me once to update)
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
                          {convertDate(singleEvent.createdAt)}
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
                      <p className="leading-relaxed text-white text-xl  ">
                        Society:{" "}
                        <span className="pl-3 text-gray-400">
                          {singleEvent.society?.society}
                        </span>
                      </p>
                    </div>
                    <h1 className="bg-red-500 text-white rounded p-2 text-xl">
                      Student Details
                    </h1>
                    <div className="bg-gray-800 p-2 grid gap-2 ">
                      {singleEvent.student.length >= 1 ? (
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
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    onClick={handleApproveEvent}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={handleRejectedEvent}
                  >
                    Decline
                  </button>
                </div>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </>
      )}

      {toggle && <PaidEvents />}
    </div>
  );
};

export default ManageEvents;
