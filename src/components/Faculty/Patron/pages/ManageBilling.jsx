import React, { useState, useEffect } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ManageBilling = () => {
  let jwt;
  if (localStorage.Patron) {
    jwt = localStorage.getItem("Patron");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [photo, setPhoto] = useState("");
  const [regNo, setRegno] = useState("");
  const [eventID, setEventId] = useState("");
  const [feedback, setFeedback] = useState("");

  const apiHandler = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:3001/api/v1/register/pendingbyPatron",
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp.data.data);
      setResponse(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiHandler();
  }, [bearer]);

  const handleApproveToggle = (photo, reg) => {
    setPhoto(photo);
    setRegno(reg);
  };

  // const handleRegisterApprove = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const resp = await axios.patch(
  //       `http://localhost:3001/api/v1/register/approve/${eventID}`,
  //       {
  //         headers: {
  //           authorization: bearer,
  //         },
  //       }
  //     );
  //     console.log(resp);
  //     toast.success("Register request approved");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.response.data.message);
  //   }
  // };
  const handleRegisterApprove = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/register/approve/${eventID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      toast.success("Event Approved Sucessfully..");
      await apiHandler();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleRegisterReject = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.patch(
        `http://localhost:3001/api/v1/register/reject/${eventID}`,
        {
          feedback,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      toast.success("Register request rejected");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className=" bg-gray-100 shadow-lg rounded-lg">
      <h1 className="p-5 text-2xl font-bold">Manage Billing Info</h1>
      <div className="grid grid-cols-3">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 col-span-2">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-red-200 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Event Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Student Regno
                </th>
                <th scope="col" className="py-3 px-6">
                  Proof
                </th>
                <th scope="col" className="py-3 px-6">
                  Approval
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {response && response.length >= 1
                ? response.map((item, index) => (
                    <tr
                      key={index + 1}
                      className="bg-gray-200 border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        handleApproveToggle(item.proof, item.student.regno);
                        setEventId(item._id);
                      }}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {item.event.title}
                      </th>
                      <td className="py-4 px-6">{item.student.regno}</td>
                      <td className="py-4 px-6">
                        <img
                          src={item.proof}
                          alt="proof img not working"
                          className=" w-12 h-12"
                        />
                      </td>
                      <td className="py-4 px-6">
                        {item.isApproved === true ? (
                          <FcApproval className="w-10 h-8 " />
                        ) : (
                          <FcCancel className="w-10 h-8" />
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          onClick={handleRegisterApprove}
                        >
                          Approve
                        </button>
                        {/* <button
                          type="button"
                          className="ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          // onClick={() => {
                          //   handleFeedbackClick();
                          // }}
                        >
                          Reject
                        </button> */}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
        {regNo && photo && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 col-span-1">
            <div className="w-full max-w-sm rounded-lg shadow-md bg-gray-800 border-gray-700">
              <img
                className="p-8 rounded-t-lg"
                src={photo}
                alt="proof not laod"
              />
              <div className="px-5 pb-5 flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{regNo}</span>
              </div>
              <div className="p-5">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Rejection Feedback
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
                  placeholder="Write your feedback here..."
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <br />
                <button
                  type="button"
                  className="ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleRegisterReject}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
        {/* {feedbackToggle && (
          
        )} */}
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
    </div>
  );
};

export default ManageBilling;
