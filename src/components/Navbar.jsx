import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
Link;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-[rgba(8,42,88,0.9)] fixed text-white w-[100vw]  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-[#1C8DCB]">
          Edu<span className="text-[#FFC820]">BRIDGE</span>
        </div>
        <div className="hidden md:flex space-x-4 ">
          <Link className="hover:bg-[#FFC820]  rounded:lg" to={"/"}>
            Home
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to={"/"}>
            About
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to={"/"}>
            Services
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to={"/"}>
            Contact
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to={"/"}>
            Testimonials
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to={"/"}>
            FAQ
          </Link>
        </div>

        {/* <div className="hidden md:flex items-center space-x-4">
        <Link to="/login"
          className="bg-[#FFC820]  text-white text-center font-medium text-md p-2 rounded-md"
        >
          LOGIN
        </Link>
        <Link
          className="border border-solid text-md font-medium text-center rounded-md border-[#FFC820] hover:bg-[#FFC820]hover:text-white p-2 transition duration-300"
          to={""}
        >
          JOIN
        </Link>
      </div> */}

        <button onClick={toggleMenu} className="md:hidden p-2">
          ☰
        </button>
      </div>

      

      {/* Mobile Menu */}
      {isOpen && (
        <div className="hidden md:flex space-x-4 ">
          <Link className="hover:bg-[#FFC820]  rounded:lg" to="/">
            Home
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to="/">
            About
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to="/">
            Services
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to="/">
            Contact
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to="/">
            Testimonials
          </Link>
          <Link className="hover:bg-[#FFC820]  rounded:lg" to="/">
            FAQ
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
