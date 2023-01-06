import React, { useState, useEffect } from "react";
import { FcFolder } from "react-icons/fc";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { saveAs } from "file-saver";
import axios from "axios";

const ViewGallery = () => {
  const [toggle, setToggle] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [singleFolderData, setSingleFolderData] = useState();

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get("http://localhost:3001/api/v1/gallery/");
        setResponse(resp.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
      }
    };

    apiHandler();
  }, [error]);

  const handleGetFolderById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/gallery/folder/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setSingleFolderData(data.data?.photo);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const downloadImage = (path) => {
    saveAs(path);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Post Pictures in the Event Gallery</h1>

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
            </div>
            <div className="grid 2xl:grid-cols-4 gap-10 justify-items-center">
              {singleFolderData &&
                singleFolderData.map((item, index) => (
                  <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <img
                      key={index + 1}
                      className="w-52 h-52 max-w-xs 2xl:max-w-lg rounded-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
                      src={item.link}
                      alt={index + 1}
                      onClick={() => {
                        downloadImage(item.link);
                      }}
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

export default ViewGallery;
