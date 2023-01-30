import React, { useState, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsToggleOn } from "react-icons/bs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const OrganizeEvent = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [duration, setDuration] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [guestSpeaker, setGuestSpeaker] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [regno, setRegno] = useState("");
  const [mobile, setMobile] = useState(0);
  const [sashes, setSashes] = useState(false);
  const [panaflex, setPanaflex] = useState(false);
  const [mediaCoverage, setMediaCoverage] = useState(false);
  const [refreshments, setRefreshment] = useState(false);
  const [transport, setTransport] = useState(false);
  const [shield, setShield] = useState(false);
  const [response, setResponse] = useState();
  const [eventResponse, setEventResponse] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [eventToggle, setEventToggle] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState("");
  const [eventSelectToggle, setEventSelectToggle] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [getDept, setGetDept] = useState("");
  const [getPatId, setGetPatId] = useState("");
  const [paid, setPaid] = useState(false);
  const [bank, setBank] = useState({ bankname: "", accnumber: "", amount: 0 });
  const [societyName, setSocietyName] = useState("");

  const [studentInput, setStudentInput] = useState([
    { stdname: "", stdregno: "", stdrole: "" },
  ]);

  const handleStudentInput = () => {
    setStudentInput([
      ...studentInput,
      { stdname: "", stdregno: "", stdrole: "" },
    ]);
  };

  const handleStudentInputRemove = (index) => {
    const list = [...studentInput];
    list.splice(index, 1);
    setStudentInput(list);
  };

  const handleStudentInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...studentInput];
    list[index][name] = value;
    setStudentInput(list);
  };

  const organizeEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/events/create",
        {
          title: title,
          proposedvenue: venue,
          duration: duration,
          supervisfacname: supervisor,
          guestspeakrname: guestSpeaker,
          student: studentInput,
          contctprsnname: contactPerson,
          contctpersonregno: regno,
          contctpersonmobile: mobile,
          sashes: sashes,
          mediacoverage: mediaCoverage,
          transport: transport,
          shield: shield,
          refreshments: refreshments,
          panaflex: panaflex,
          startdate: date,
          department: getDept,
          society: selectedSociety,
          patron: getPatId,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );

      console.log(resp);
      toast.success("Event created");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  const organizePaidEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/events/create",
        {
          title: title,
          proposedvenue: venue,
          duration: duration,
          supervisfacname: supervisor,
          guestspeakrname: guestSpeaker,
          student: studentInput,
          contctprsnname: contactPerson,
          contctpersonregno: regno,
          contctpersonmobile: mobile,
          sashes: sashes,
          mediacoverage: mediaCoverage,
          transport: transport,
          shield: shield,
          refreshments: refreshments,
          panaflex: panaflex,
          startdate: date,
          department: getDept,
          society: selectedSociety,
          patron: getPatId,
          isPaid: true,
          bank,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );

      console.log(resp);
      toast.success("Event created");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3001/api/v1/societyandtypes/societbydepartment/${getDept}`,
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        // console.log(resp);
        setResponse(resp.data.data);
        setError(null);
        console.log(resp.data.data);
      } catch (err) {
        setError(err);
        setResponse(null);
        console.log(error);
      }
    };
    apiHandler();
  }, [error]);

  useEffect(() => {
    const eventApiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/societyandtypes/alleventtypes"
          // {
          //   headers: {
          //     authorization: bearer,
          //   },
          // }
        );
        setEventResponse(resp.data.data);
        // console.log("events are ", eventResponse);
      } catch (err) {
        console.log(err);
      }
    };
    eventApiHandler();
  }, [error, eventResponse]);

  const handleEventClick = () => {
    setEventToggle(!eventToggle);
  };

  const handleSocietySelection = async (xSociety, name, patId) => {
    console.log(name);
    handleEventClick();
    setSelectedSociety(xSociety);
    setSocietyName(name);
    setGetPatId(patId);
  };

  const handleSelectEventClick = () => {
    setEventSelectToggle(!eventSelectToggle);
  };

  const handleEventSelection = (xEvent) => {
    handleSelectEventClick();
    setSelectedEvent(xEvent);
  };

  // console.log("selected society = ", selectedSociety);
  // console.log("selected event = ", selectedEvent);
  console.log({ date });

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/users/getMe",
          {
            headers: {
              authorization: bearer,
            },
          }
        );

        setGetDept(resp.data.data.department);
      } catch (err) {
        console.log(err);
      }
    };
    apiHandler();
  }, [bearer]);

  return (
    <div className="pr-2 mb-10 2xl:p-10 2xl:mb-0 2xl:pr-0">
      <div className="2xl:w-3/5 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
        <div className="relative h-48 bg-red-500 rounded-bl-4xl">
          <svg
            className="absolute bottom-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="px-10 pb-8 bg-white rounded-tr-4xl">
          <h1 className="text-4xl font-semibold text-gray-900">
            Organize Event!
          </h1>
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <span>Free</span>
            <span>
              <BsToggleOn
                className={`${
                  paid ? "-rotate-0 text-red-600" : "rotate-180"
                } text-[2rem] mt-[0.5rem]`}
                onClick={() => {
                  setPaid(!paid);
                }}
              />
            </span>
            <span className="text-red-500">Paid</span>
          </div>
          <form className="mt-12">
            <h1 className="flex justify-center bg-red-500 rounded h-8 text-2xl font-semibold">
              Basic Information
            </h1>
            <div className="lg:grid lg:grid-cols-2 gap-x-8 mt-8">
              <div className="mb-6">
                <label
                  for="title"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Title of the Activity
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="date"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Date
                </label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Proposed Venue
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Duration
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Supervising Faculty Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={(e) => setSupervisor(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="text"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Guest Speaker name & Designation
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={(e) => setGuestSpeaker(e.target.value)}
                />
              </div>
              {/* testing List of Societies*/}
              <div className="mb-6 relative inline-block text-left">
                <div>
                  <button
                    onClick={handleEventClick}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {societyName != "" ? (
                      <span>{societyName}</span>
                    ) : (
                      <span>List of Societies</span>
                    )}

                    <AiOutlineCaretDown className="-mr-1 ml-2 h-5 w-5" />
                  </button>
                </div>
                {eventToggle && (
                  <div
                    className="absolute z-10 mt-2 min-w-full origin-top-right rounded-md bg-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                              handleSocietySelection(
                                item._id,
                                item.society,
                                item.patron._id
                              );
                            }}
                          >
                            {item.society}
                            {item.department && (
                              <span className="ml-2 font-bold">
                                Department: {item.department}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <h1 className="flex justify-center bg-red-500 rounded h-8 text-2xl font-semibold">
              Students Details
            </h1>
            {studentInput.map((singleStudent, index) => (
              <div key={index}>
                <div className="mb-6">
                  <input
                    name="stdname"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    id="stdname"
                    value={singleStudent.stdname}
                    onChange={(e) => handleStudentInputChange(e, index)}
                    placeholder="Student Name"
                  />
                  <input
                    name="stdregno"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    id="stdregno"
                    value={singleStudent.stdregno}
                    onChange={(e) => handleStudentInputChange(e, index)}
                    placeholder="Student Registration Number"
                  />
                  <input
                    name="stdrole"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    id="stdrole"
                    value={singleStudent.stdrole}
                    onChange={(e) => handleStudentInputChange(e, index)}
                    placeholder="Student Role"
                  />
                  {studentInput.length > 1 && (
                    <button
                      className="bg-red-600 w-auto h-auto rounded p-2 mt-2 font-bold"
                      onClick={() => {
                        handleStudentInputRemove(index);
                      }}
                    >
                      Remove
                    </button>
                  )}

                  {studentInput.length - 1 === index && (
                    <button
                      className={` ${
                        studentInput.length > 1 ? "ml-4" : ""
                      }  w-auto h-auto p-2 mt-2 font-bold text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg`}
                      onClick={handleStudentInput}
                    >
                      Add More Students
                    </button>
                  )}
                </div>
              </div>
            ))}
            {/* contact person name */}
            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-lg font-medium text-gray-900 "
              >
                Contact Person Details
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  placeholder="Contact Person Name"
                  onChange={(e) => setContactPerson(e.target.value)}
                />
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  placeholder="Reg No"
                  onChange={(e) => setRegno(e.target.value)}
                />
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  placeholder="Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
            {/* Requirements */}
            <h1 className="flex justify-center bg-red-500 rounded h-8 text-2xl font-semibold">
              Requirements (Please Tick the box)
            </h1>
            <div className="lg:grid lg:grid-cols-2 gap-x-8 mt-8">
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={true}
                  className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-red-500 "
                  onChange={(e) => setSashes(e.target.value)}
                />
                <label
                  for="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  SASHES - If required, contact Student Affairs Office.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={true}
                  className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-red-500 "
                  onChange={(e) => setPanaflex(e.target.value)}
                />
                <label
                  for="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  PANAFLEX - If required, contact Student Affairs Office.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={true}
                  className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-red-500 "
                  onChange={(e) => setMediaCoverage(e.target.value)}
                />
                <label
                  for="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  MEDIA COVERAGE - If required, contact Student Affairs Office.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={true}
                  className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-red-500 "
                  onChange={(e) => setRefreshment(e.target.value)}
                />
                <label
                  for="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  REFRESHMENTS - If required, Submit the copy of the form to the
                  concerend Academic Officer a day before the event.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={true}
                  className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-red-500 "
                  onChange={(e) => setTransport(e.target.value)}
                />
                <label
                  for="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  TRANSPORT - If required, contact Student Affairs Office.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={true}
                  className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-red-500 "
                  onChange={(e) => setShield(e.target.value)}
                />
                <label
                  for="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  SHIELD - to be decided as per policy by the signing authority.
                </label>
              </div>
            </div>

            {/* Billing Info */}
            {paid && (
              <>
                <h1 className="flex justify-center bg-red-500 rounded h-8 text-2xl font-semibold">
                  Billing Information
                </h1>
                <div className="mb-6">
                  <input
                    // name="stdname"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    // id="stdname"
                    value={bank.bankname}
                    onChange={(e) =>
                      setBank({ ...bank, bankname: e.target.value })
                    }
                    placeholder="Bank Name"
                  />
                  <input
                    // name="stdregno"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    // id="stdregno"
                    value={bank.accnumber}
                    onChange={(e) =>
                      setBank({ ...bank, accnumber: e.target.value })
                    }
                    placeholder="Account Number"
                  />
                  <input
                    // name="amount"
                    type="number"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    // id="amount"
                    value={bank.amount}
                    onChange={(e) =>
                      setBank({ ...bank, amount: e.target.value })
                    }
                    placeholder="Amount"
                  />
                </div>
              </>
            )}

            {!paid && (
              <button
                type="submit"
                className="mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={organizeEventHandler}
              >
                {isLoading ? (
                  <div>
                    <svg
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  <p>Submit</p>
                )}
              </button>
            )}
            {paid && (
              <button
                type="submit"
                className="mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={organizePaidEventHandler}
              >
                {isLoading ? (
                  <div>
                    <svg
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  <p>Organize Paid Event</p>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />;
    </div>
  );
};

export default OrganizeEvent;
