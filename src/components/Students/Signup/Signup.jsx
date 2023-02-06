import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaInfoCircle } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import custLogo from "../../images/custlogo_white.png";
import background from "../../images/background.png";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// const EMAIL_REGEX =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;
const NAME_REGEX = /^[a-zA-Z\s]{2,24}$/;
const REG_REGEX = /^[a-zA-Z0-9]{9}$/;

const Signup = () => {
  const Navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [regno, setRegno] = useState("");
  const [validRegno, setValidRegno] = useState(false);
  const [regnoFocus, setRegnoFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [department, setDepartment] = useState("");

  const [photo, setPhoto] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validPhoto, setValidPhoto] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidRegno(REG_REGEX.test(regno));
  }, [regno]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, passwordConfirm]);

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
    formData.append("department", department);

    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/users/signupstudent",
        formData
      );
      setResponse(resp);
      setError(null);
      setIsLoading(false);
      toast.success("User Registered. Please wait till you get verified");
      await delay(1000);
      Navigate("/std-login");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
      setError(err.response.data.message);
      setResponse(null);
      setIsLoading(false);
    }
  };

  function validatePNG(file) {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const isValid = acceptedFileTypes.includes(file.type);
    return isValid;
  }

  const handleChange = (event) => {
    const file = event.target.files[0];
    const isValid = validatePNG(file);
    console.log({ isValid });
    if (isValid) {
      setValidPhoto(true);
      setPhoto(file);
    } else {
      setValidPhoto(false);
    }
  };

  // console.log({ photo });

  return (
    <div
      className="bg-cover w-screen h-screen pb-20"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="p-5">
        <img src={custLogo} alt="custlogo" className="w-32 ml-8 " />
        <h5 className="text-white text-l">Capital Management System</h5>
      </div>
      <div className="grid justify-items-center items-center  ]">
        <form className="bg-black/70 mt-10 2xl:w-[60rem] p-5 2xl:mt-0 rounded">
          <div className="block p-3 max-w-sm shadow-md w-full ml-auto mr-auto">
            <h2 className=" text-gradiant-to-r from text-white  rounded flex justify-center text-2xl font-bold">
              <span className="mt-1 text-red-500 text-2xl">
                <FaGraduationCap />
              </span>
              CUST <span className="text-red-500 pl-2">EMS</span>
            </h2>
          </div>
          <h2 className=" text-gradiant-to-r from text-white/75  rounded flex justify-center text-2xl font-bold p-3 mb-4">
            Student Signup
          </h2>
          <div class="relative z-0 w-full mb-6 group">
            <div className="flex items-center gap-2">
              <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                value={email}
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                required
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="email address"
              />
              <FaCheck
                className={validEmail ? "text-green-500 text-xl" : "hidden"}
              />
              <FaTimes
                className={
                  validEmail || !email ? "hidden" : "text-red-500 text-xl"
                }
              />
            </div>
            <p
              id="email"
              className={
                emailFocus && !validEmail
                  ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                  : "absolute -left-[9999px]"
              }
            >
              <span className="flex gap-2 items-center -mb-4">
                <FaInfoCircle /> Email should be in standard format.
              </span>
              <br />
              test@mail.com
            </p>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <div className="flex items-center gap-2">
              <input
                autoComplete="off"
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                placeholder="password"
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
          <div class="relative z-0 w-full mb-6 group">
            <div className="flex items-center gap-2">
              <input
                autoComplete="off"
                className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                type="password"
                id="cpassword"
                onChange={(e) => setpasswordConfirm(e.target.value)}
                value={passwordConfirm}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                placeholder="confirm password"
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
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="floating_first_name"
                  placeholder="full name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  autoComplete="off"
                  value={name}
                  className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
                <FaCheck
                  className={validName ? "text-green-500 text-xl" : "hidden"}
                />
                <FaTimes
                  className={
                    validName || !name ? "hidden" : "text-red-500 text-xl"
                  }
                />
              </div>
              <p
                id="name"
                className={
                  nameFocus && !validName
                    ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                    : "absolute -left-[9999px]"
                }
              >
                <span className="flex gap-2 items-center -mb-4">
                  <FaInfoCircle /> Name should only contains alphabets.
                </span>
              </p>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="regno"
                  id="regno"
                  className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5"
                  placeholder="registration no"
                  required
                  onChange={(e) => setRegno(e.target.value)}
                  autoComplete="off"
                  value={regno}
                  aria-invalid={validRegno ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setRegnoFocus(true)}
                  onBlur={() => setRegnoFocus(false)}
                />
                <FaCheck
                  className={validRegno ? "text-green-500 text-xl" : "hidden"}
                />
                <FaTimes
                  className={
                    validRegno || !regno ? "hidden" : "text-red-500 text-xl"
                  }
                />
              </div>
              <p
                id="name"
                className={
                  regnoFocus && !validRegno
                    ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                    : "absolute -left-[9999px]"
                }
              >
                <span className="flex gap-2 items-center -mb-4">
                  <FaInfoCircle /> Reg no should oncly contains alphabets &
                  numbers.
                  <br />
                  Valid Reg: BXX123456
                </span>
              </p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  name="card"
                  id="card"
                  className="bg-gray-50/25 text-white text-sm font-semibold rounded-lg w-full p-2.5 "
                  required
                  // onChange={(e) => setPhoto(e.target.files[0])}
                  onChange={handleChange}
                  accept="image/*"
                />
                <FaCheck
                  className={validPhoto ? "text-green-500 text-xl" : "hidden"}
                />
                <FaTimes
                  className={validPhoto ? "hidden" : "text-red-500 text-xl"}
                />
              </div>
            </div>
            <div className="mb-6">
              <select
                name="dropdown"
                id="dropdown"
                className="bg-gray-50/25 text-black text-sm font-semibold rounded-lg w-full p-2.5 "
                onClick={(e) => setDepartment(e.target.value)}
              >
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
          </div>
          <button
            type="submit"
            onClick={signupHandler}
            className=" text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={
              !validEmail ||
              !validName ||
              !validPhoto ||
              !validPwd ||
              !validRegno
            }
          >
            <ImSpinner2
              className={`${
                isLoading ? "animate-spin" : "hidden"
              } inline mr-3 w-4 h-4 text-white`}
            />
            {isLoading ? <span>Loading...</span> : <span>Signup</span>}
          </button>
          <p className="flex justify-center text-gray-500 mt-2">
            Or If Already Registered
          </p>
          <p
            className="flex justify-center cursor-pointer hover:underline  text-white font-medium"
            onClick={() => {
              Navigate("/std-login");
            }}
          >
            SIGN IN
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

export default Signup;
