import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IdCard from "../../../images/idCard.png";

const GeneralInfo = () => {
  let jwt;
  if (localStorage.HOD) {
    jwt = localStorage.getItem("HOD");
  }

  const bearer = "Bearer " + jwt;
  const Navigate = useNavigate();
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [eventSelector, setEventSelector] = useState(false);

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
        console.log("hod ", resp);
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
      console.log(resp);
      toast.success("Password Updated Sucessfully...");
      Navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex px-20 mt-20">
      <img src={IdCard} alt="profle-pic" />
      <div className="mt-32">
        <h1 className="text-6xl">HOD's General Information</h1>
        <div className="flex ">
          <div className="grid gap-2 pt-4 px-4 text-2xl font-bold underline">
            <h1 className="mt-9 ">Name</h1>
            <h1 className="">Username.</h1>
            <h1 className="">Email</h1>
            <h2 className="">Role</h2>
            <h2 className="">Action</h2>
          </div>
          {response && (
            <div className="grid gap-2 pt-4 px-10 text-2xl">
              <h1 className="mt-9 ">{response.name}</h1>
              <h1 className="">{response.username}</h1>
              <h1 className="">{response.email}</h1>
              <h2 className="">{response.role}</h2>
              <button
                className=" text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={handleClick}
              >
                Reset Password
              </button>
            </div>
          )}
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
          <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Event Details
                </h3>
                <button
                  onClick={handleClick}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
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
