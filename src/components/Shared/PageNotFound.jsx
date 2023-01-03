import React from "react";
import Emoji from "../images/emoji.png";

const PageNotFound = () => {
  return (
    <div className="grid justify-center mt-20">
      <img src={Emoji} alt="emoji" className="w-64 ml-24" />
      <h1 className="grid justify-center text-4xl font-bold text-red-500 mt-5">
        Site Not Found
      </h1>
      <p className="font-bold grid justify-center mt-5">
        Well this is awkward. The site you are looking for is not here.
      </p>
      <h1 className="grid justify-center mt-10 text-red-500 font-bold">
        CUST Event Managment
      </h1>
    </div>
  );
};

export default PageNotFound;
