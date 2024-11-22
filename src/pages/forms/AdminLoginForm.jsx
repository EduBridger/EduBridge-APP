import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAdminLogin } from "../../services/auth"; // Ensure this is correctly implemented
import { Link } from "react-router-dom";
import bg from "../../assets/image/logo.png";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: 'admin'
      };

      console.log('Sending login request with payload:', payload);
      const response = await apiAdminLogin(payload);
      console.log('Received login response:', response);

      // Check the actual structure of your response
      const { data } = response;
      console.log('Response data:', data);

      // Assuming your backend sends token as either data.token or data.accessToken
      const token = data.token || data.accessToken;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Token should already be stored by apiAdminLogin, but let's verify
      const storedToken = localStorage.getItem('accessToken');
      console.log('Stored token:', storedToken);

      setShowAlert(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error) {
      console.error('Login Error Details:', {
        error: error,
        response: error.response,
        data: error.response?.data
      });
      
      if (error.response?.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="w-[60%] h-screen mx-auto flex flex-col md:flex-row bg-[#2a557a] text-white p-8 rounded-lg">
      {/* Left Section */}
      <div className="md:w-1/2 h-[90%] mt-10">
        <img
          className="font-bold h-[90%] w-full text-2xl flex items-center justify-center"
          src={bg}
          alt=""
        />
        <p>
          By Logging to EduBridge, you agree to our
          <span>
            <Link to="/" className="text-yellow-600"> Terms </Link>
          </span> and 
          <span>
            <Link to="/" className="text-yellow-600"> Privacy </Link>Policy.
          </span>
        </p>
      </div>

      {/* Right Section */}
      <div
        className="md:w-[70%] text-black p-8 rounded-lg ml-1 shadow-lg h-[80%] mt-20 flex flex-col justify-center bg-white"
      >
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-500 font-bold mb-2"
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
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-500 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#2a557a] hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          {/* <div className="mt-3 text-sm">
            <p>
              Don't have an account{" "}
              <span>
                <Link
                  to="/admin-signup"
                  className="text-[#2a557a] hover:text-blue-400 font-bold text-md"
                >
                  Create an account
                </Link>
              </span>
            </p>
          </div> */}
        </form>
        {showAlert && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 flex justify-between items-center">
            <p>Login successful. Redirecting to admin dashboard.</p>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              &times;
            </button>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 bg-red-500 text-white p-3 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLoginForm;
