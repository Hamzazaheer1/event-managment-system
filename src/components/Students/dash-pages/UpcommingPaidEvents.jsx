import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  AiOutlineCalendar,
  AiFillClockCircle,
  AiFillBank,
} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiDialpad } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

const UpcomingPaidEvents = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [toggle, setToggle] = useState(false);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/events/upcoming",
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        console.log(resp.data);
        setResponse(resp.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
      }
    };
    apiHandler();
  }, [error]);

  function convertDate(dateString) {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  console.log(response);

  const handleRegister = async (id) => {
    setToggle(!toggle);
    setId(id);
  };

  const RegisterEvent = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("photo", photo);

    try {
      const resp = await axios.post(
        `http://localhost:3001/api/v1/register/create/${id}`,
        formData,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      toast.success("register request submitted");
    } catch (err) {
      let error = err.response.data.message;
      console.log(err);
      let trimmed = error.slice(0, 6);
      if (trimmed === "E11000") {
        toast.error("Already Registered....");
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Upcoming Events in CUST</h1>
      {toggle && (
        <div>
          <div className="mb-6">
            <label
              for="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Upload Payment Transfer Screenshot
            </label>
            <input
              type="file"
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 w-auto "
              required
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 "
              onClick={RegisterEvent}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4">
        {response?.PaidEvents.length >= 1 &&
          response?.PaidEvents.map((item, index) => (
            <div
              className="w-[20rem] p-6 bg-gradient-to-b from-red-500 to-white  border-gray-200 rounded-lg shadow-md shadow-red-400 hover:scale-105 duration-200 mt-10"
              key={index + 1}
            >
              <p className="mb-3 font-bold text-white">
                Department of <span>{item.department}</span>
              </p>
              <p className="mb-3 font-bold text-black">
                Event: <span>{item.title}</span>
              </p>
              <div className="text-black text-sm font-semibold">
                <p className="mb-1  flex items-center gap-1">
                  <AiOutlineCalendar />
                  {convertDate(item.startdate)}
                </p>
                <p className="mb-1  flex items-center gap-1">
                  <AiFillClockCircle />
                  {item.duration}
                </p>
                <p className="mb-1  flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {item.proposedvenue}
                </p>
                <div>
                  <p className="mb-1  flex items-center gap-1">
                    <AiFillBank />
                    {item.bank.bankname}
                  </p>
                  <p className="mb-1  flex items-center gap-1">
                    <BiDialpad />
                    {item.bank.accnumber}
                  </p>
                  <p className="mb-1  flex items-center gap-1">
                    <BsCashCoin />
                    {item.bank.amount}
                  </p>
                </div>
              </div>
              <hr className="border-black mt-4" />
              <p
                className="w-max mx-auto mt-2 font-bold text-black cursor-pointer hover:underline "
                onClick={() => {
                  handleRegister(item.id);
                }}
              >
                Register Now
              </p>
            </div>
          ))}
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
    </div>
  );
};

export default UpcomingPaidEvents;
