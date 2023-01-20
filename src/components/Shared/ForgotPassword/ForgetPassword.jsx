import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaInfoCircle } from "react-icons/fa";
import custLogo from "../../images/custlogo_white.png";
import background from "../../images/background.png";
import axios from "axios";

const StudentLogin = () => {
  const Navigate = useNavigate();
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/users/forgotpassword",
        { email }
      );
      setResponse(resp);
      setError(null);
      console.log(response);
      alert("Email has been sent to your email");
      setIsLoading(false);
      Navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err);
      setResponse(null);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full h-screen"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="p-5">
        <img src={custLogo} alt="custlogo" className="w-32 ml-8" />
        <h5 className="text-white text-lg">Capital Management System</h5>
      </div>
      <div className="grid justify-items-center items-center">
        <form className="bg-black/70 mt-10 2xl:w-[60rem] p-5 2xl:mt-0 rounded">
          <div className="block p-3 max-w-sm shadow-md w-full ml-auto mr-auto">
            <h2 className=" text-gradiant-to-r from text-white  rounded flex justify-center text-2xl font-bold">
              <span className="mt-1 text-red-500 text-2xl">
                <FaGraduationCap />
              </span>
              CUST <span className="text-red-500 pl-2">EMS</span>
            </h2>
          </div>
          <br />
          <h2 className=" text-gradiant-to-r from text-white/75  rounded flex justify-center text-2xl font-bold pb-3 mb-4">
            Forgot Password
          </h2>
          <div className="mb-6">
            <input
              autoComplete="off"
              type="email"
              id="email"
              className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className=" text-sm text-gray-600 pt-2">
              Enter the registered Email and reset Password link will be sent to
              your Email.
              <span className="font-bold pl-2">
                Link will be valid for 10mins
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={loginHandler}
          >
            {isLoading ? (
              <div>
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </div>
            ) : (
              <p>Forgot Password</p>
            )}
          </button>
          <p className="flex justify-center text-gray-500 mt-4">
            Or go back to sign in
          </p>
          <p
            className="flex justify-center cursor-pointer hover:underline  text-white font-medium"
            onClick={() => {
              Navigate("/");
            }}
          >
            Sign in
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
