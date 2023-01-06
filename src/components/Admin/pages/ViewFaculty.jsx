import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ViewFaculty = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/api/v1/users/allfaculty",
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

  console.log(response);

  return (
    <div>
      <div className=" bg-gray-100 shadow-lg">
        <h1 className="mt-6 p-5 text-2xl font-bold">
          List of All the Faculty Members
        </h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-10">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-red-200 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Username
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Role
                </th>
                <th scope="col" className="py-3 px-6">
                  Department
                </th>
              </tr>
            </thead>
            {response &&
              response.map((item, index) => (
                <tbody key={index + 1}>
                  <tr className="bg-gray-200 border-b hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item.name}
                    </th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item.username}
                    </th>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">{item.role}</td>
                    <td className="py-4 px-6">{item.department}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFaculty;
