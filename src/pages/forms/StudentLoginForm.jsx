import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3800/student/login', formData, {
        headers: {
          Authorization: 'Bearer <your_access_token_here>',
        },
      });

      if (response.data.success) {
        // Handle successful login, e.g., redirect to student dashboard
        navigate('/student-dashboard');
      } else {
        // Handle login failure, e.g., display an error message
        console.error('Login failed:', response.data.error);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, e.g., display an error message
      setShowAlert(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
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
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-bold">
              Forgot Password?
            </a>
          </div>
        </form>
        {showAlert && (
          <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 flex justify-between items-center">
            <p>Login failed. Please check your credentials and try again.</p>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLoginForm;