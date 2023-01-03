import React, { useState, useEffect } from "react";
import { FcFolder, FcFile } from "react-icons/fc";
import { GoPlus } from "react-icons/go";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

const ManageGallery = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [addEvent, setAddEvent] = useState(false);
  const [option, setOption] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [photo, setPhoto] = useState("");
  const [foldername, setFoldername] = useState("");
  const [singleFolderData, setSingleFolderData] = useState();
  const [folderId, setFolderId] = useState("");

  // const handleClick = () => {
  //   setAddEvent(!addEvent);
  // };

  // console.log(photo);
  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get("http://localhost:3001/api/v1/gallery/");
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        console.log(error);
        setError(err);
        setResponse(null);
      }
    };

    apiHandler();
  }, [error]);

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/gallery/uploadtofolder/${folderId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: bearer,
          },
          body: formData,
        }
      );
      const responseData = await response.json();
      // console.log(response);
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Photo Uploaded Sucessfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateFolder = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("foldername", foldername);
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/gallery/create",
        {
          method: "POST",
          headers: {
            Authorization: bearer,
          },
          body: formData,
        }
      );
      const responseData = await response.json();
      // console.log(response);
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Photo Uploaded Sucessfully");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleGetFolderById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/gallery/folder/${id}`,
        {
          method: "GET",
          // headers: {
          //   Authorization: bearer,
          // },
          // body: formData,
        }
      );

      const data = await response.json();
      // console.log(data.data.photo);
      setSingleFolderData(data.data?.photo);
      // console.log(singleFolderData);
      // const responseData = await response.json();
      // console.log(responseData);
      // if (!response.ok) {
      //   alert(responseData.message);
      //   throw new Error(responseData.message);
      // }
      // alert("Photo Uploaded Sucessfully");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Post Pictures in the Event Gallery</h1>

      <div className="mt-10 relative">
        <button
          class="px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
          onClick={() => {
            // setOption(!option);
            // setAddEvent(false);
            setCreateFolder(!createFolder);
          }}
        >
          <FcFolder /> New Folder
        </button>
        {/* <button
          class="px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
          onClick={() => {
            setOption(!option);
            setAddEvent(false);
            setCreateFolder(false);
          }}
        >
          <GoPlus />
          New
        </button> */}
        {/* Dropdown menu  */}
        {/* <div
          class={`${
            option
              ? " z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow mt-1"
              : "hidden"
          }`}
        >
          <ul
            class="py-1 text-sm text-gray-700 "
            aria-labelledby="dropdownDefault"
          >
            <li
              class="cursor-pointer py-2 px-4 hover:bg-gray-100  flex items-center gap-1 text-base"
              onClick={() => {
                setAddEvent(false);
                setCreateFolder(true);
              }}
            >
              <FcFolder /> New Folder
            </li>
            <li
              class="cursor-pointer py-2 px-4 hover:bg-gray-100  flex items-center gap-1 text-base"
              onClick={() => {
                setCreateFolder(false);
                setAddEvent(true);
              }}
            >
              <FcFile />
              Picture Upload
            </li>
          </ul>
        </div> */}
        <div className=" pr-52">
          {createFolder && (
            <>
              <input
                type={"text"}
                placeholder="Folder name"
                className="mt-10"
                onChange={(e) => setFoldername(e.target.value)}
              />

              <div className="flex justify-center items-center 2xl:w-full w-64">
                <label className="mt-5 flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-3 w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <button
                type="button"
                className="mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleCreateFolder}
              >
                Submit
              </button>
            </>
          )}

          {/* {addEvent && (
            <div>
              <div className="flex justify-center items-center 2xl:w-full w-64">
                <label className="mt-5 flex flex-col justify-center items-center p-4 w-auto h-20 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <button
                type="button"
                className="mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleUploadImage}
              >
                Submit
              </button>
            </div>
          )} */}
        </div>
      </div>
      <div className=" bg-gray-100 rounded-lg ">
        <h1 className="mt-6 p-5 text-2xl font-bold">Existing Pictures</h1>

        {toggle === false && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg 2xl:p-10 ">
            <div className="grid 2xl:grid-cols-4 gap-10 justify-items-center">
              {response &&
                response.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-1 cursor-pointer"
                    onClick={() => {
                      handleGetFolderById(item._id);
                      setToggle(true);
                      setFolderId(item._id);
                    }}
                  >
                    <FcFolder className="text-4xl" />{" "}
                    <span className=" font-semibold">{item.foldername}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {toggle && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg 2xl:p-10 ">
            <div className="flex gap-5">
              <button
                class="mb-10 px-4 py-2 ring-2 h-10 text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
                onClick={() => {
                  setToggle(false);
                }}
              >
                <AiOutlineArrowLeft />
                Select Folder
              </button>
              <button
                class="mb-10 px-4 py-2 ring-2 h-10 text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
                onClick={() => {
                  // setCreateFolder(false);
                  setAddEvent(!addEvent);
                }}
              >
                <FcFile />
                Upload Picture
              </button>
            </div>
            {addEvent && (
              <div className="mb-10">
                <div className="flex justify-center items-center 2xl:w-full w-64">
                  <label className="mt-5 flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className="mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={handleUploadImage}
                >
                  Submit
                </button>
              </div>
            )}
            <div className="grid 2xl:grid-cols-4 gap-10 justify-items-center">
              {singleFolderData &&
                singleFolderData.map((item, index) => (
                  <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <img
                      key={index + 1}
                      className="w-52 h-52 max-w-xs 2xl:max-w-lg rounded-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
                      src={item.link}
                      alt={index + 1}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
