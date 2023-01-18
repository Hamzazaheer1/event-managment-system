import React, { useState, useEffect } from "react";
import { FcFolder, FcFile } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

const ManageGallery = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [addEvent, setAddEvent] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [photo, setPhoto] = useState("");
  const [foldername, setFoldername] = useState("");
  const [singleFolderData, setSingleFolderData] = useState();
  const [folderId, setFolderId] = useState("");

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

  useEffect(() => {
    apiHandler();
  }, [error]);

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      const resp = await axios.patch(
        `http://localhost:3001/api/v1/gallery/uploadtofolder/${folderId}`,
        formData,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      toast.success("Photo Uploaded Sucessfully...");

      await apiHandler();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleCreateFolder = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("foldername", foldername);
    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/gallery/create",
        formData,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      toast.success("Photo Uploaded Sucessfully...");
      await apiHandler();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleGetFolderById = async (id) => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/v1/gallery/folder/${id}`
      );
      setSingleFolderData(resp.data.data.photo);
      console.log(resp.data.data.photo);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Post Pictures in the Event Gallery</h1>

      <div className="mt-10 relative">
        <button
          className="px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
          onClick={() => {
            setCreateFolder(!createFolder);
          }}
        >
          <FcFolder /> New Folder
        </button>
        <div className=" pr-52">
          {createFolder && (
            <>
              <input
                type={"text"}
                placeholder="Folder name"
                className="mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 w-auto "
                onChange={(e) => setFoldername(e.target.value)}
              />

              <div className="flex justify-center items-center 2xl:w-full w-64">
                <label className="mt-5 flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 ">
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
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 ">
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
                className="mb-10 px-4 py-2 ring-2 h-10 text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
                onClick={() => {
                  setToggle(false);
                }}
              >
                <AiOutlineArrowLeft />
                Select Folder
              </button>
              <button
                className="mb-10 px-4 py-2 ring-2 h-10 text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200 flex items-center gap-1"
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
                  <label className="mt-5 flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 ">
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
                      <p className="mb-2 text-sm text-gray-500 ">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 ">
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
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
    </div>
  );
};

export default ManageGallery;
