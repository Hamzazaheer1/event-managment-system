import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

const VerifyStudents = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [openAddManger, setOpenAddManager] = useState(false);
  const [name, setName] = useState(""); // string name;
  const [photo, setPhoto] = useState("");

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const handleStudentVerify = async (id) => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/v1/users/studentverify/${id}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      alert("Student Verified Sucessfully...");
    } catch (err) {
      alert("Error...");
    }
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/users/unverifiedstudents",
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

  // console.log(response);

  const handleClick = (photo, name) => {
    setPhoto(photo);
    setName(name);
    setOpenAddManager(true);
  };

  return (
    <div>
      <div className=" bg-gray-100 shadow-lg rounded-lg">
        <h1 className="mt-6 p-5 text-2xl font-bold">
          List of Unverified Students
        </h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 h-screen">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Photo
                </th>
                <th scope="col" className="py-3 px-6">
                  Registration No.
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Role
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {response &&
              response.map((item, index) => (
                <tbody key={index + 1}>
                  <tr
                    className="border-b bg-gray-800 border-gray-700  hover:bg-gray-600 cursor-pointer"
                    onClick={() => {
                      handleClick(item.photo, item.name);
                    }}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={item.photo}
                        alt="stdimg"
                        className="w-10 h-10 hover:scale-150 duration-150 rounded-sm"
                      />
                    </th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.regno}
                    </th>
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">{item.role}</td>
                    <td
                      className="py-4 px-6 flex cursor-pointer hover:scale-110 duration-200"
                      onClick={() => {
                        handleStudentVerify(item._id);
                      }}
                    >
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          {/* model */}
          <div
            id="staticModal"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
            className={`${
              openAddManger
                ? "overflow-y-auto overflow-x-hidden 2xl:fixed right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full grid justify-items-center mt-10"
                : "hidden"
            }`}
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-100 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-red-600 ">
                    Student Detail
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="staticModal"
                    onClick={() => {
                      setOpenAddManager(false);
                    }}
                  >
                    <MdClose className="w-5 h-5 hover:text-red-100-600" />
                  </button>
                </div>
                <div className="p-6 flex flex-col items-center gap-4">
                  <img
                    src={photo}
                    alt="im not load"
                    className="w-[25rem] h-[25rem] rounded-xl"
                  />
                  <h1 className="text-medium font-semibold underline">
                    {name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyStudents;
