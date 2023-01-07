// Toast Notification

import { ToastContainer, toast } from "react-toastify";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

toast.success("Login successfull");
await delay(2000);
Navigate("/admin-dashboard");

toast.error(err.response.data.message);

<ToastContainer autoClose={2000} closeOnClick pauseOnHover />;

// AXIOS CALLS

// AXIOS GET Request
useEffect(() => {
  const apiHandler = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:3001/api/v1/events/pendingAdmin",
        {
          headers: {
            authorization: bearer,
          },
        }
      );
      setResponse(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  apiHandler();
}, [bearer]);

// AXIOS PATCH / DELETE Request
const handlePatch = async () => {
  try {
    const resp = await axios.patch(
      "http://localhost:3001/api/v1/users/updatepassword",
      {
        currentPassword,
        password,
        passwordConfirm,
      },
      {
        headers: {
          authorization: bearer,
        },
      }
    );
    console.log(resp);
    toast.success("Password Updated Sucessfully...");
    await delay(2000);
    Navigate("/admin-login");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

// AXIOS POST Request & FormData
const handleCreateFolder = async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("foldername", foldername);
  try {
    const resp = await axios.post(
      "http://localhost:3001/api/v1/gallery/create",
      {
        formData,
      },
      {
        headers: {
          authorization: bearer,
        },
      }
    );
    console.log(resp);
    toast.success("Photo Uploaded Sucessfully...");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
