import React, { useState, useEffect } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import axios from "axios";

const RegisterRequests = () => {
  let jwt;
  if (localStorage.Student) {
    jwt = localStorage.getItem("Student");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [photo, setPhoto] = useState("");
  const [openAddManger, setOpenAddManager] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiHandler = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/register/myregisters",
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        console.log(resp.data.data);
        setResponse(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
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
      <h1 className=" p-5 text-2xl font-bold ">
        Your Register In Event Requests
      </h1>

      <p className="font-bold pl-5 text-red-600 underline">
        Bring the screenshot of this page with you in the event for
        verification......
      </p>

      {isLoading ? (
        <div role="status" className="flex justify-center pb-10">
          <svg
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg 2xl:p-10">
          <table className="w-max 2xl:w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-red-200 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Proff
                </th>
                <th scope="col" className="py-3 px-6">
                  Approval
                </th>
                <th scope="col" className="py-3 px-6">
                  Rejection
                </th>
                <th scope="col" className="py-3 px-6">
                  Feedback
                </th>
              </tr>
            </thead>

            <tbody>
              {response && response.length >= 1
                ? response.map((item, index) => (
                    <tr
                      key={index + 1}
                      className="cursor-pointer bg-gray-200 border-b  hover:bg-gray-50"
                      onClick={() => {
                        handleClick(item.proof);
                      }}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {item?.event?.title}
                      </th>
                      <td className="py-4 px-6">
                        <img src={item.proof} className=" w-12 h-12" />
                      </td>

                      <td className="py-4 px-6">
                        {item.isApproved === true ? (
                          <FcApproval className="w-10 h-8 " />
                        ) : (
                          // <FcCancel className="w-10 h-8" />
                          ""
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {item.isRejected === true ? (
                          <FcApproval className="w-10 h-8 " />
                        ) : (
                          // <FcCancel className="w-10 h-8" />
                          ""
                        )}
                      </td>
                      <td className="py-4 px-6">{item?.event?.feedback}</td>
                    </tr>
                  ))
                : ""}
            </tbody>
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
                    Register Proof
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
                  <img src={photo} className="w-[25rem] h-[25rem] rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterRequests;
