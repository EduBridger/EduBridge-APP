import React from "react";
import heroimg from "../assets/image/bg4.png";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaGraduationCap, FaHome } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="h-screen grid grid-cols-2 w-full">
      <div className="mt-[70px] w-[100%] h-screen">
        <img className="object-cover h-full" src={heroimg} alt="" srcset="" />
      </div>
      <div className="bg-white flex items-center justify-center w-full h-screen pt-30 ">
        <div className="max-w-5xl w-full h-screen pt-60">
          <div className="text-center ">
            <h1 className="text-2xl font-bold text-blue-900 sm:text-5xl lg:text-3xl">
              EduBridge: Streamlining Education Through Technology
            </h1>
            <p className="mt-3 text-lg text-gray-600 sm:mt-5 sm:text-2xl"></p>
          </div>
          <div className="mt-10 flex justify-center space-x-6 text-center sm:ml-32">
            <Link
              to="/admin-signup"
              className="inline-flex items-center md:px-4 px-2 md:py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-[rgba(8,42,88,0.9)] hover:bg-blue-600  "
            >
              <FaHome className="mr-2" /> Administrators
            </Link>
            <Link
              to="/teacher-login"
              className="inline-flex items-center  px-4 py-2 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaChalkboardTeacher className="mr-2" /> Teachers
            </Link>
            <Link
              to="/student-login"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-1xl font-medium rounded-md text-gray-700 bg-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaGraduationCap className="mr-2" /> Learners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
