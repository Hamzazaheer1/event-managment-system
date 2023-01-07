import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ManageSocietyNames = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [society, setSociety] = useState("");
  const [addEvent, setAddEvent] = useState(false);
  const [scopes, setScopes] = useState([]);
  const [department, setDeparment] = useState("");
  const [patronToggle, setPatronToggle] = useState(false);
  const [patId, setPatId] = useState("");
  const [selectDept, setSelectDept] = useState("");
  const [patList, setPatList] = useState();
  const [societyId, setSocietyId] = useState("");

  const handleClick = () => {
    setAddEvent(!addEvent);
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/societyandtypes/allsocites",
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        console.log("society types ", resp.data.data);
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

  const handleCreateSociety = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/societyandtypes/createsociety",
        {
          society,
          scope: scopes,
          department,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );

      console.log(resp);
      toast.success("Society added Sucessfully...");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const handleDeleteSociety = async (id) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3001/api/v1/societyandtypes/deletesociety/${id}`,
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      console.log(resp);
      toast.success("Society Deleted Sucessfully...");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3001/api/v1/users/patronbydepartment/${selectDept}`,
          {
            headers: {
              authorization: bearer,
            },
          }
        );
        setPatList(resp.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, [bearer, selectDept]);

  const handleAssignPatron = async () => {
    try {
      await axios.patch(
        `http://localhost:3001/api/v1/societyandtypes/assignpat/${societyId}`,
        {
          patron: patId,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      toast.success("Patron assigned sucessfully...");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Societies</h1>
      <div className="flex">
        <div className="mt-10 relative">
          <button
            onClick={handleClick}
            className={` ${
              addEvent ? "ring-red-200" : "ring-red-100"
            } inline-block px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200`}
          >
            Add new Society
          </button>
          <div className="pr-52">
            {addEvent && (
              <>
                <div className="mt-10 relative">
                  <label class="text-gray-700 font-bold block mb-2">
                    New Society name:
                  </label>
                  <input
                    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
                    type="text"
                    placeholder="name"
                    onChange={(e) => setSociety(e.target.value)}
                  />
                </div>
                <div className="mt-5 relative">
                  <label class="text-gray-700 font-bold block mb-2">
                    Scopes:
                  </label>
                  <input
                    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
                    type="text"
                    placeholder="cricket,football without spaces"
                    onChange={(e) => setScopes(e.target.value.split(","))}
                  />
                </div>
                <div className="mt-8 relative">
                  <select
                    name="dropdown"
                    id="dropdown"
                    className="inline-block px-4 py-2 ring-2 mb-2 text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200"
                    onChange={(e) => setDeparment(e.target.value)}
                  >
                    <option value="*">Select Department</option>
                    <option value="BBA">BBA</option>
                    <option value="CS">CS</option>
                    <option value="SE">SE</option>
                    <option value="Psychology">Psychology</option>
                    <option value="EE">EE</option>
                    <option value="CE">CE</option>
                    <option value="ME">ME</option>
                    <option value="Biosciences">Biosciences</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="AF">AF</option>
                    <option value="Pharm.D">Pharm.D</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={handleCreateSociety}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
        {patronToggle && (
          <div className="mt-10 relative">
            <select
              name="dropdown"
              id="dropdown"
              className="inline-block px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200"
              onChange={(e) => setSelectDept(e.target.value)}
            >
              <option value="*">Select Department</option>
              <option value="BBA">BBA</option>
              <option value="CS">CS</option>
              <option value="SE">SE</option>
              <option value="Psychology">Psychology</option>
              <option value="EE">EE</option>
              <option value="CE">CE</option>
              <option value="ME">ME</option>
              <option value="Biosciences">Biosciences</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Microbiology">Microbiology</option>
              <option value="AF">AF</option>
              <option value="Pharm.D">Pharm.D</option>
              <option value="None">None</option>
            </select>
          </div>
        )}

        {patList && (
          <div className="mt-10 relative">
            {patList.map((item, index) => (
              <select
                key={index}
                name="dropdown"
                id="dropdown"
                className="ml-5 inline-block px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200"
                onChange={(e) => setPatId(e.target.value)}
              >
                <option value="*">Select Patron</option>

                <option value={item._id}>{item.name}</option>
              </select>
            ))}
          </div>
        )}

        {patId && (
          <button
            onClick={handleAssignPatron}
            className="ml-5 mt-10 relative inline-block px-4 py-2 ring-2  text-white bg-red-500 rounded shadow uppercase hover:bg-red-800 focus:ring-red-900 hover:scale-110 duration-200"
          >
            Assign Patron
          </button>
        )}
      </div>

      <div className=" bg-gray-100 rounded-lg">
        <h1 className="mt-6 p-5 text-2xl font-bold">Existing Societies</h1>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10 ">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-red-200 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Names
                </th>
                <th scope="col" className="py-3 px-6">
                  Scopes
                  <th>List</th>
                </th>
                <th scope="col" className="py-3 px-6">
                  Deparment
                </th>
                <th scope="col" className="py-3 px-6">
                  Patron
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {response &&
                response.map((item, index) => (
                  <tr className="bg-gray-200 border-b  hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index + 1}
                    </th>
                    <td className="py-4 px-6">{item.society}</td>
                    <td>
                      <tr>
                        {item.scope?.map((item, index) => (
                          <tr key={index} className="py-4 px-6">
                            <li>{item}</li>
                          </tr>
                        ))}
                      </tr>
                    </td>
                    <td className="py-4 px-6">{item.department}</td>
                    <td className="py-4 px-6">{item.patron?.name}</td>
                    <td className="py-4 px-6 flex ">
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5  cursor-pointer hover:scale-110 duration-200"
                        onClick={() => {
                          setPatronToggle(!patronToggle);
                          setSocietyId(item._id);
                        }}
                      >
                        Assign Patron
                      </button>
                      <button
                        type="button"
                        className="ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5  cursor-pointer hover:scale-110 duration-200"
                        onClick={() => {
                          handleDeleteSociety(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
    </div>
  );
};

export default ManageSocietyNames;
