import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IdCard from "../../images/idCard.png";
import { ToastContainer, toast } from "react-toastify";

const GeneralInfo = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;
  const Navigate = useNavigate();
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [eventSelector, setEventSelector] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = () => {
    setEventSelector(!eventSelector);
  };

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
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
        console.log(error);
      }
    };
    apiHandler();
  }, [bearer, error]);

  const handleUpdatePassword = async () => {
    try {
      const resp = await axios.patch(
        "http://localhost:3001/api/v1/users/updatepassword",
        {
          currentPassword,
          password,
          passwordConfirm,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      toast.success("Password Updated Sucessfully...");
      await delay(1000);
      localStorage.removeItem("Student");

      Navigate("/std-login");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex px-20 mt-20">
      <img src={IdCard} alt="profle-pic" />
      <div className="mt-32">
        <h1 className="text-6xl">Student General Information</h1>
        <div className="flex ">
          <div className="grid gap-2 pt-4 px-4 text-2xl font-bold underline">
            <h1 className="mt-9 ">Name</h1>
            <h1 className="">Registration No.</h1>
            <h1 className="">Email</h1>
            <h2 className="">Role</h2>
            <h2 className="">Department</h2>
            <h2 className="">Action</h2>
          </div>
          {response && (
            <div className="grid gap-2 pt-4 px-10 text-2xl">
              <h1 className="mt-9 ">{response.name}</h1>
              <h1 className="">{response.regno}</h1>
              <h1 className="">{response.email}</h1>
              <h2 className="">{response.role}</h2>
              <h2 className="">{response.department}</h2>
              <button
                className=" text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={handleClick}
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          className={`${
            eventSelector ? " " : "hidden"
          }  overflow-y-auto overflow-x-hidden 2xl:fixed right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full grid justify-items-center`}
        >
          <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex justify-between items-start p-4 rounded-t border-b ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Event Details
                </h3>
                <button
                  onClick={handleClick}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="defaultModal"
                >
                  <ImCross />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="bg-gray-800 text-white w-[30rem] rounded p-2"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="bg-gray-800 text-white w-[30rem] rounded p-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password Confirm"
                  className="bg-gray-800 text-white w-[30rem] rounded p-2"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>

              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={handleUpdatePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />;
    </div>
  );
};

export default GeneralInfo;
