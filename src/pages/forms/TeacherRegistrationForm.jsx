

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAdminRegisterTeacher } from "../../services/auth";

const TeacherRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    course: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate ()
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Check for admin token again before submitting
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Admin authentication required");
      }

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        course: formData.course,
        email: formData.email,
        password: formData.password,
        role: "teacher",
      };

      console.log("Sending teacher registration payload:", payload);
      const response = await apiAdminRegisterTeacher(payload);
      console.log("Registration response:", response);

      if (response && response.data) {
        setShowAlert(true);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.status === 401) {
        setErrorMessage("Teacher already register.");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
            "Registration failed. Please try again."
        );
      } else {
        setErrorMessage(
          error.message || "An error occurred during registration."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Teacher Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter teacher's first name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter teacher's last name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="course"
              className="block text-gray-700 font-bold mb-2"
            >
              Course
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter course"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter teacher's email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Teacher Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Set a password for the teacher"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 focus:outline-none"
              onClick={() =>
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  course: "",
                })
              }
            >
              Clear form
            </button>
          </div>
        </form>

        {showAlert && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 flex justify-between items-center">
            <p>Teacher registered successfully!</p>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              &times;
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 flex justify-between items-center">
            <p>{errorMessage}</p>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setErrorMessage("")}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherRegistrationForm;

// import {
//   apiAdminRegisterTeacher,
//   refreshAccessToken
// } from '../../services/auth';
