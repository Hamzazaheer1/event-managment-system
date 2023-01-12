import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FcApproval, FcCancel } from "react-icons/fc";

const Report = () => {
  let { id } = useParams();

  let jwt;
  if (localStorage.Patron) {
    jwt = localStorage.getItem("Patron");
  }
  if (localStorage.Hod) {
    jwt = localStorage.getItem("Hod");
  }
  if (localStorage.Dean) {
    jwt = localStorage.getItem("Dean");
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const Navigate = useNavigate();
  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3001/api/v1/events/oneevent/${id}`,
          {
            headers: {
              authorization: bearer,
            },
          }
        );

        console.log(resp.data.data);
        setResponse(resp.data.data);
        await delay(4000);
        window.print();
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, [bearer]);

  function convertDate(dateString) {
    const date = new Date(dateString);

    // format date using the toLocaleDateString() method
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <>
      <div class="bg-white font-sans w-screen flex justify-center ">
        <main class="p-4">
          <section class="mb-4 text-center">
            <h1 className="font-semibold text-4xl mb-10">Event Report</h1>
            <h2 class="text-lg font-medium mb-2">Basic Information</h2>
            <p class="text-sm text-gray-500 mb-1 ">
              <span className="text-black font-semibold">Titile: </span>
              {response?.title}
            </p>
            <p class="text-sm text-gray-500 mb-1">
              <span className="text-black font-semibold">Created At: </span>
              {convertDate(response?.createdAt)}
            </p>
            <p class="text-sm text-gray-500 mb-1">
              <span className="text-black font-semibold">Venue: </span>
              {response?.proposedvenue}
            </p>
            <p class="text-sm text-gray-500 mb-1">
              <span className="text-black font-semibold">Duration: </span>
              {response?.duration}
            </p>
            <p class="text-sm text-gray-500 mb-1">
              <span className="text-black font-semibold">
                Supervisor Name:{" "}
              </span>
              {response?.supervisfacname}
            </p>
            <p class="text-sm text-gray-500 mb-1">
              <span className="text-black font-semibold">
                Guest Speaker Name:{" "}
              </span>
              {response?.guestspeakrname}
            </p>
          </section>
          <section class="mb-4">
            <h2 class="text-lg font-medium">Students Details</h2>
            <p class="text-gray-700">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Registration No.
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {response?.student.length >= 1 ? (
                      response.student.map((item, index) => (
                        <tr key={index} class="bg-white border-b ">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {item.stdname}
                          </th>
                          <td class="px-6 py-4">{item.stdregno}</td>
                          <td class="px-6 py-4"> {item.stdrole}</td>
                        </tr>
                      ))
                    ) : (
                      <tr class="bg-white border-b">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {response?.student.stdname}
                        </th>
                        <td class="px-6 py-4">{response?.student.stdregno}</td>
                        <td class="px-6 py-4"> {response?.student.stdrole}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </p>
          </section>
          <section class="mb-4">
            <h2 class="text-lg font-medium">Contact Person Detail</h2>
            <p class="text-gray-700">
              <p class="text-gray-700">
                <span className="text-black font-semibold">Name: </span>
                {response?.contctprsnname}
              </p>
              <p class="text-gray-700">
                <span className="text-black font-semibold">
                  Registration No:{" "}
                </span>
                {response?.contctpersonregno}
              </p>
              <p class="text-gray-700">
                <span className="text-black font-semibold">Mobile No. </span>
                {response?.contctpersonmobile}e
              </p>
            </p>
          </section>
          <section class="mb-4">
            <h2 class="text-lg font-medium">Other Requirements</h2>
            <p class="text-gray-700 grid grid-cols-3">
              <p className="leading-relaxed  text-sm flex ">
                Sashes:{" "}
                <span className="pl-3 text-gray-400">
                  {response?.sashes === true ? (
                    <FcApproval className=" w-5 h-5 " />
                  ) : (
                    <FcCancel className=" w-5 h-5 " />
                  )}
                </span>
              </p>
              <p className="leading-relaxed  text-sm flex ">
                Panaflex:{" "}
                <span className="pl-3 text-gray-400">
                  {response?.panaflex === true ? (
                    <FcApproval className=" w-5 h-5 " />
                  ) : (
                    <FcCancel className=" w-5 h-5 " />
                  )}
                </span>
              </p>
              <p className="leading-relaxed text-sm flex  ">
                Media Coverage:{" "}
                <span className="pl-3 text-gray-400">
                  {response?.mediacoverage === true ? (
                    <FcApproval className=" w-5 h-5 " />
                  ) : (
                    <FcCancel className=" w-5 h-5 " />
                  )}
                </span>
              </p>
              <p className="leading-relaxed  text-sm  flex">
                Refreshments:{" "}
                <span className="pl-3 text-gray-400">
                  {response?.refreshments === true ? (
                    <FcApproval className=" w-5 h-5 " />
                  ) : (
                    <FcCancel className=" w-5 h-5 " />
                  )}
                </span>
              </p>
              <p className="leading-relaxed text-sm flex ">
                Transport:{" "}
                <span className="pl-3 text-gray-400">
                  {response?.transport === true ? (
                    <FcApproval className=" w-5 h-5 " />
                  ) : (
                    <FcCancel className=" w-5 h-5 " />
                  )}
                </span>
              </p>
              <p className="leading-relaxed text-sm flex  ">
                Shield:{" "}
                <span className="pl-3 text-gray-400">
                  {response?.shield === true ? (
                    <FcApproval className=" w-5 h-5 " />
                  ) : (
                    <FcCancel className=" w-5 h-5 " />
                  )}
                </span>
              </p>
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default Report;
