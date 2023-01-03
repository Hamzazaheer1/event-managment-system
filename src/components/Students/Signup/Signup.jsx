import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import custLogo from "../../images/custlogo_white.png";

const Signup = () => {
  const Navigate = useNavigate();
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const signupHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("regno", regno);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("photo", photo);

    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/users/signupstudent",
        formData
      );
      setResponse(resp);
      setError(null);
      await delay(1000);
      setIsLoading(false);
      Navigate("/std-login");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      setResponse(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url(https://custonline.com/public/lib/img/login.jpg)] bg-cover w-screen h-full pb-20">
      <div className="p-5">
        <img src={custLogo} alt="custlogo" className="w-32 ml-8 " />
        <h5 className="text-white text-l">Capital Management System</h5>
      </div>
      <div className="grid justify-items-center items-center">
        <form className="bg-white mt-10 w-max p-5 rounded 2xl:w-[30rem] 2xl:mt-0">
          <div className="block p-3 max-w-lg bg-red-500 rounded shadow-md -mt-[3rem] mb-6">
            <h2 className=" text-gradiant-to-r from text-white  rounded flex justify-center text-2xl font-bold">
              Student Sign Up
            </h2>
          </div>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              placeholder="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              placeholder="name@mail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Registration No.
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              placeholder="regno"
              required
              onChange={(e) => setRegno(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              required
              placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              required
              placeholder="*******"
              onChange={(e) => setpasswordConfirm(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="file_input"
            >
              Upload Student Id Card Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            <p className="mt-1 text-sm text-gray-500 ">
              PNG, JPG or JPEG (MAX. 800x400px).
            </p>
          </div>

          <button
            type="submit"
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={signupHandler}
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
              <p>Sign up</p>
            )}
          </button>
          <p className="flex justify-center text-gray-500 mt-2">
            Or If Already Registered
          </p>
          <p
            className="flex justify-center underline cursor-pointer mt-2"
            onClick={() => {
              Navigate("/std-login");
            }}
          >
            SIGN IN
          </p>
          {response
            ? response.data.status === "success" && (
                <div
                  className="mt-4 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                  role="alert"
                >
                  <span className="font-medium">
                    Account Created Successfully!
                  </span>
                </div>
              )
            : ""}
          {error ? (
            <div
              className="mt-4 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg "
              role="alert"
            >
              <span className="font-medium">Oops!</span> {error}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
