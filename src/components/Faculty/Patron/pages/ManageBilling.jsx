import React, { useState, useEffect } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import axios from "axios";

const ManageBilling = () => {
  let jwt;
  if (localStorage.Patron) {
    jwt = localStorage.getItem("Patron");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [photo, setPhoto] = useState("");
  const [openAddManger, setOpenAddManager] = useState(false);

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/register/myregisters",
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

  const handleClick = (photo) => {
    setPhoto(photo);
    setOpenAddManager(true);
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
              </tr>
            </thead>
            <tbody>
              {response && response.length >= 1
                ? response.map((item, index) => (
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
                      <td className="py-4 px-6">{item.event.title}</td>
                      <td className="py-4 px-6">{item.student.regno}</td>
                      <td className="py-4 px-6">
                        <img src={item.proof} className=" w-12 h-12" />
                      </td>
                      <td className="py-4 px-6">
                        {convertDate(item.createdAt)}
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
                  ))
                : ""}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 col-span-1">
          <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                class="p-8 rounded-t-lg"
                src="/docs/images/products/apple-watch.png"
                alt="product image"
              />
            </a>
            <div class="px-5 pb-5">
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                  BSP191085
                </span>
                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBilling;