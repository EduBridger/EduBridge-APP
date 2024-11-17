import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminSignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    school: '',
    role: 'admin',
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3800/admin/signup', formData, {
        headers: {
          Authorization: 'Bearer <your_access_token_here>',
        },
      });

      if (response.data.success) {
        setShowAlert(true);
        // Reset form data or perform other actions
      }

      console.log('Admin registration successful:', response.data);
      // Handle successful registration, e.g., redirect to a success page
    } catch (error) {
      console.error('Error registering admin:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Admin Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your last name"
              required
            />
          </div>
          {/* Other form fields */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a secure password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school" className="block text-gray-700 font-bold mb-2">
              School*
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your school name"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 focus:outline-none"
              onClick={() => setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                school: '',
                role: 'admin',
              })}
            >
              Clear form
            </button>
           
          </div>
          <div className='mt-3 text-sm'>
              <p>Already have an account <span><Link to="/admin-login" className='text-blue-600 hover:text-blue-900'>
              Login
               </Link></span> 
                
              </p>
            </div>
        </form>
      </div>

      {showAlert && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 flex justify-between items-center">
            <p>Issue report received successfully by support team. Check notifications for response.</p>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              &times;
            </button>
          </div>
        )}

    </div>
  );
};

export default AdminSignUpForm;