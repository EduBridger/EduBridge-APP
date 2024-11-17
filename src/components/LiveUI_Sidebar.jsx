import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const SidebarLiveUI = () => {
  return (
    <div className="lg:w-[20%] lg:h-120vh w-[20%] p-4 mt-[59px] h-screen  bg-[#3d9970] fixed ">
      <div className="flex justify-center">
        {/* <img
          className="font-bold  rounded-full lg:w-20  w-20 h-20 lg:h-20 text-xl mb-6 flex items-center justify-center"
          src={logo}
          alt=""
        /> */}
      </div>
      <div className="flex items-center  justify-center text-lg font-semibold">
        <FontAwesomeIcon className="text-gray-500" icon={faGear} />
        <h1 className="lg:pl-2">SETTINGS</h1>
      </div>
      <div>
        <h1 className="">
          <Link to={"/"}>
            <button
              className="w-full  p-2   text-black hover:bg-white "
              onClick={() => handleViewChange("")}
            >
             General
            </button>
          </Link>
        </h1>
        <h1 className="">
          <Link to={"/"}>
            <button
              className="w-full hover:bg-white  p-2   text-black "
              onClick={() => handleViewChange("")}
            >
              Nav Items
            </button>
          </Link>
        </h1>
        <h1 className="">
          <Link to={"/"}>
            <button
              className="w-full hover:bg-white  p-2   text-black "
              onClick={() => handleViewChange("")}
            >
              Account
            </button>
          </Link>
        </h1>
        <h1 className="">
          <Link to={"/"}>
            <button
              className="w-full hover:bg-white  p-2   text-black "
              onClick={() => handleViewChange("")}
            >
              Notifications
            </button>
          </Link>
        </h1>
        <h1 className="">
          <Link to={"/"}>
            <button
              className="w-full hover:bg-white  p-2   text-black "
              onClick={() => handleViewChange("")}
            >
             Help
            </button>
          </Link>
        </h1>
      </div>

      <div className="mb-4">
        <Link to={"/live_ui_dashboard/live-chat"}>
          <button
            className='lg:w-full  hover:bg-[#02311d] hover:"transition duration-150 ease-in-out p-2  bg-white rounded-lg font-semibold text-black '
            onClick={() => handleViewChange("")}
          >
            Live Chat and Support
          </button>
        </Link>
      </div>
      <div className="text-sm space-y-2 flex flex-col justify-center items-center">
      <Link to="/"><h1>Privacy & Policy</h1></Link>
      <Link to="/"> <h1>Contact Us</h1></Link>
      </div>
      

  
      <div className=" mt-10 flex flex-col  items-center">
        <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full mb-4">
          ID
        </div>
        <p className="text-sm font-semibold">client</p>
        <p className="text-xs text-gray-500">client@client.com</p>
      </div>
    </div>
  );
};

export default SidebarLiveUI;
