import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import custLogo from "../../images/custlogo_white.png";
import background from "../../images/background.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaGraduationCap, FaInfoCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;

const StudentLogin = () => {
  const Navigate = useNavigate();
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { token } = useParams();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [password, passwordConfirm]);

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.patch(
        `http://localhost:3001/api/v1/users/resetPassword/${token}`,
        { password, passwordConfirm }
      );
      setResponse(resp);
      setError(null);
      toast.success("Passowrd Changed Sucessfully");
      setIsLoading(false);
      await delay(1000);
      Navigate("/");
    } catch (err) {
      setError(err);
      console.log(error);
      setResponse(null);
      setIsLoading(false);
      toast.error(err);
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
        <h5 className="text-white text-l">Capital Management System</h5>
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
          <h2 className=" text-gradiant-to-r from text-white/75  rounded flex justify-center text-2xl font-bold pb-3 ">
            Change Password
          </h2>

          <div className="mb-5 mt-5">
            <div className="flex items-center gap-2">
              <input
                type="password"
                id="password"
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <FaCheck
                className={validPwd ? "text-green-500 text-xl" : "hidden"}
              />
              <FaTimes
                className={
                  validPwd || !password ? "hidden" : "text-red-500 text-xl"
                }
              />
            </div>
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                  : "absolute -left-[9999px]"
              }
            >
              <span className="flex gap-2 items-center -mb-4">
                <FaInfoCircle /> Password should contains.
              </span>
              <br />
              At least one number, one uppercase, one lowercase alphabet and one
              special character
              <br />
              Minimum 8 characters long
            </p>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <input
                type="password"
                id="password"
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                placeholder="confirm password"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <FaCheck
                className={
                  validMatch && passwordConfirm
                    ? "text-green-500 text-xl"
                    : "hidden"
                }
              />
              <FaTimes
                className={
                  validMatch || !passwordConfirm
                    ? "hidden"
                    : "text-red-500 text-xl"
                }
              />
            </div>
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
              <p>Submit</p>
            )}
          </button>
        </form>
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
    </div>
  );
};

export default StudentLogin;
