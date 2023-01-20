import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import { FaGraduationCap, FaInfoCircle } from "react-icons/fa";
import custLogo from "../../images/custlogo_white.png";
import axios from "axios";
import background from "../../images/background.png";

const USER_REGEX = /^[A-z]*\.[a-z]*$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.{8,})/;

const AdminLogin = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useCallback(() => {
    if (localStorage.getItem("Student")) {
      Navigate("/student-dashboard");
    } else if (localStorage.getItem("Patron")) {
      Navigate("/Patron-dashboard");
    } else if (localStorage.getItem("HOD")) {
      Navigate("/hod-dashboard");
    } else if (localStorage.getItem("Dean")) {
      Navigate("/dean-dashboard");
    } else if (localStorage.getItem("admin")) {
      Navigate("/admin-dashboard");
    }
  }, [Navigate]);

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      setIsLoading(false);
      return;
    }

    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        { user, password: pwd }
      );

      if (resp.data.data.role === "admin") {
        localStorage.setItem("admin", resp.data.token);
        toast.success("Login successfull");
        await delay(2000);
        Navigate("/admin-dashboard");
      } else {
        toast.error("Inavlid credentials");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
      errRef.current.focus();
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full h-screen "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="p-5">
        <img src={custLogo} alt="custlogo" className="w-32 ml-8 " />
        <h5 className="text-white text-lg">Capital Management System</h5>
      </div>
      <div className="grid justify-items-center items-center ">
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
          <h2 className=" text-gradiant-to-r from text-white/75  rounded flex justify-center text-2xl font-bold p-3 mb-4">
            Admin Sign in
          </h2>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                value={user}
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                placeholder="Admin Id"
                required
                onChange={(e) => setUser(e.target.value)}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <FaCheck
                className={validName ? "text-green-500 text-xl" : "hidden"}
              />
              <FaTimes
                className={
                  validName || !user ? "hidden" : "text-red-500 text-xl"
                }
              />
            </div>
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                  : "absolute -left-[9999px]"
              }
            >
              <span className="flex gap-2 items-center -mb-4">
                <FaInfoCircle />4 to 24 characters.
              </span>
              <br />
              Must begin with a letter and contain dot.
              <br />
            </p>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <input
                type="password"
                id="password"
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                required
                placeholder="*****"
                onChange={(e) => setPwd(e.target.value)}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <FaCheck
                className={validPwd ? "text-green-500 text-xl" : "hidden"}
              />
              <FaTimes
                className={validPwd || !pwd ? "hidden" : "text-red-500 text-xl"}
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
                <FaInfoCircle /> 8 to 24 characters.
              </span>
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <button
            type="submit"
            onClick={loginHandler}
            className=" text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            <ImSpinner2
              className={`${
                isLoading ? "animate-spin" : "hidden"
              } inline mr-3 w-4 h-4 text-white`}
            />
            {isLoading ? <span>Loading...</span> : <span>Login</span>}
          </button>

          <p
            className="cursor-pointer hover:underline pt-5 text-white font-medium"
            onClick={() => {
              Navigate("/forgetpass");
            }}
          >
            Forget Password
          </p>
          <p
            ref={errRef}
            className={
              errMsg
                ? "text-red-700 bg-red-100 rounded-lg text-sm p-4 mb-4 mt-4 font-semibold"
                : "absolute -left-[9999px]"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </form>
        <div className="p-2 text-black text-4xl 2xl:w-[60rem] rounded-b-lg bg-white/50 text-center items-center">
          Capital University of Science & Technology
        </div>
      </div>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />
    </div>
  );
};

export default AdminLogin;
