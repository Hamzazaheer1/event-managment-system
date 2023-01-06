import React, { useState, useEffect } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
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

  useEffect(() => {
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
        setResponse(resp.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    apiHandler();
  }, [bearer]);

  const handleClick = (photo, reg) => {
    setPhoto(photo);
    setRegno(reg);
  };

  const handleRegisterApprove = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3001/api/v1/register/approve/${eventID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });
      alert("Register request approved");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterReject = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3001/api/v1/register/reject/${eventID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });
      alert("Register request rejected");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-gray-100 shadow-lg rounded-lg">
      <h1 className="p-5 text-2xl font-bold">Manage Billing Info</h1>
      <div className="grid grid-cols-3">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 col-span-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        handleClick(item.proof, item.student.regno);
                        setEventId(item._id);
                      }}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          onClick={handleRegisterApprove}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          onClick={handleRegisterReject}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
        {photo && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 col-span-1">
            <div class="w-full max-w-sm rounded-lg shadow-md bg-gray-800 border-gray-700">
              <img class="p-8 rounded-t-lg" src={photo} alt="proof not laod" />
              <div class="px-5 pb-5 flex items-center justify-between">
                <span class="text-3xl font-bold text-white">{regNo}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBilling;
