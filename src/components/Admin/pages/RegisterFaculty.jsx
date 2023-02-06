import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import axios from "axios";

// const RegUser = /^[a-zA-Z.]{3,20}$/;
const RegUser = /^[a-zA-Z]+\.[a-zA-Z0-9]{1,17}$/;

// eslint-disable-next-line
const RegPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const RegisterFaculty = () => {
  let jwt;
  if (localStorage.admin) {
    jwt = localStorage.getItem("admin");
  }

  const bearer = "Bearer " + jwt;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validCPwd, setValidCPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validUName, setValidUName] = useState(false);

  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setValidUName(RegUser.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(RegPwd.test(password));
    setValidCPwd(RegPwd.test(passwordConfirm));
    setValidMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  const signupHandler = async (event) => {
    event.preventDefault();
    // const v1 = RegUser.test(username);
    // const v2 = RegPwd.test(password);
    // if (!v1 || !v2) {
    //   toast.success("Invalid Entry");
    //   return;
    // }

    try {
      const resp = await axios.post(
        "http://localhost:3001/api/v1/users/signupfaculty",
        {
          name,
          email,
          username,
          password,
          passwordConfirm,
          role,
          department,
        },
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      setResponse(resp);
      await delay(3000);
      setResponse(null);
      toast.success("Faculty user registered Successfully");
    } catch (err) {
      toast.error(err.response.data.message);
      await delay(3000);
      // errRef.current.focus();
    }
  };

  return (
    <div className="grid justify-items-center items-center">
      <form className="bg-white mt-10 mb-10 2xl:w-[30rem] p-5 2xl:mt-0 rounded ">
        <h2 className=" text-gradiant-to-r from text-red-500 to-red-500 rounded p-2 flex justify-center text-4xl font-bold mb-8">
          Register Faculty
        </h2>
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
            className="flex gap-1 flex-row text-sm font-semibold text-gray-800"
          >
            Username
            <FaCheck
              className={validUName ? "text-green-500 text-lg" : "hidden"}
            />
            <FaTimes
              className={
                validUName || !username ? "hidden" : "text-red-500 text-xl"
              }
            />
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="userNote"
            className={
              userFocus && !validUName
                ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                : "absolute -left-[9999px]"
            }
          >
            <span className="flex gap-2 items-center -mb-4">
              <FaInfoCircle /> Must start with a string and contain dot and the
              alphanumaric characters.
            </span>
            <br />
            The username should no more than 23 characters long.
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="flex gap-1 flex-row text-sm font-semibold text-gray-800"
          >
            Password
            <FaCheck
              className={validPwd ? "text-green-500 text-lg" : "hidden"}
            />
            <FaTimes
              className={
                validPwd || !password ? "hidden" : "text-red-500 text-xl"
              }
            />
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            required
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd
                ? "text-[0.75rem] bg-black text-white p-2 relative -bottom-[10px] w-max rounded-md"
                : "absolute -left-[9999px]"
            }
          >
            <span className="flex gap-2 items-center -mb-4">
              <FaInfoCircle /> Minimum length of 8 characters.
            </span>
            <br />
            At least one lowercase and one uppercase letter.
            <br />
            At least one digit and one special character
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="flex gap-1 flex-row text-sm font-semibold text-gray-800"
          >
            Confirm Password
            <FaCheck
              className={
                validCPwd && validMatch ? "text-green-500 text-lg" : "hidden"
              }
            />
            <FaTimes
              className={
                !validMatch || !validCPwd ? "text-red-500 text-xl" : "hidden"
              }
            />
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            required
            placeholder="*******"
            onChange={(e) => setpasswordConfirm(e.target.value)}
          />
        </div>
        <div className="flex gap-10">
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="file_input"
            >
              Role
            </label>
            <select
              name="dropdown"
              id="dropdown"
              className="cursor-pointer w-32 h-10 bg-red-500 text-white p-1 font-bold rounded"
              onClick={(e) => setRole(e.target.value)}
            >
              <option value="Patron">Patron</option>
              <option value="HOD">HOD</option>
              <option value="Dean">Dean</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="file_input"
            >
              Department
            </label>
            <select
              name="dropdown"
              id="dropdown"
              className="cursor-pointer w-32 h-10 bg-red-500 text-white p-1 font-bold rounded"
              onClick={(e) => setDepartment(e.target.value)}
            >
              <option value="BBA">BBA</option>
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
          className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={signupHandler}
          disabled={!validPwd || !validMatch || !validUName}
        >
          Register
        </button>

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
            <span className="font-medium">Oops!</span> Check your credentials
            and try again.
          </div>
        ) : (
          ""
        )}
      </form>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover />;
    </div>
  );
};

export default RegisterFaculty;
