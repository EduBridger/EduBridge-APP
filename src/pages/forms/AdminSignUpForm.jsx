import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminSignUp } from '../../services/auth';
import bg from "../../assets/image/bg5.jpg"
import SuccessPopup from '../../components/SuccessPopup';

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
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      school: formData.school,
      role: 'admin',
    };

    const response = await apiAdminSignUp(payload);

    if (response.status === 200) {
      setShowAlert(true);
      // Reset form data or perform other actions
    }

    console.log('Admin registration successful:', response.data);
    // Handle successful registration, e.g., redirect to a success page
    navigate("/admin-login")
  } catch (error) {
    console.error('Error registering admin:', error);
    // Handle error, e.g., display an error message
  }
};

return (
  <div className="w-[80%] h-screen mx-auto flex flex-col md:flex-row bg-[#2a557a] text-black p-8 rounded-lg">
  {/* Left Section */}
  <div className="md:w-1/2 h-[90%] text-gray-400 text-sm">
  <img
          className="font-bold h-full  w-full text-2xl pt-8  flex mb-5 items-center justify-center"
          src={bg}
          alt=""
        />
   <p> By signing up on EduBridge, you agree to our <span> <Link to='/' className='text-yellow-500'>Terms </Link></span>of use  and <span><Link to='/' className='text-yellow-500'>Privacy </Link>Policy.</span></p>
     
  </div>

  {/* Right Section */}
  <div className='bg-white px-8 pt-4 ml-3 w-[50%] h-full'>
  <h2 className="text-2xl font-bold text-black ">Admin Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name
          </label>
          <div className='bg-[rgba(8,42,88,0.9)]'>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="rounded-full  w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm transition-all duration-300"
            placeholder="Enter your first name"
            required
          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
            Last Name
          </label>
          <div className='bg-[rgba(8,42,88,0.9)]'>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="rounded-full  w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm transition-all duration-300"
            placeholder="Enter your last name"
            required
          />
          </div>
        </div>
        {/* Other form fields */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <div className='bg-[rgba(8,42,88,0.9)]'>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-full  w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm transition-all duration-300"
            placeholder="Enter your email address"
            required
          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <div className='bg-[rgba(8,42,88,0.9)]'>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded-full  w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm transition-all duration-300"
            placeholder="Enter a secure password"
            required
          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="school" className="block text-gray-700 font-bold mb-2">
            School
          </label>
          <div className='bg-[rgba(8,42,88,0.9)]'>
          <input
            type="text"
            id="school"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            className="rounded-full  w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm transition-all duration-300"
            placeholder="Enter your school name"
            required
          /> 
          </div>
        </div>
        <div className="flex justify-between ">
          <button
            type="submit"
            className="bg-[#2a557a] hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        <div className=''><p>Already have an account <span><Link to="/admin-login" className='text-[#2a557a] hover:text-blue-900 font-bold'>
            Login
             </Link></span>  </p></div> 
      </form>
    </div>

    {showAlert && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 flex justify-between items-center">
          <p>"Account created successfully. Please login."</p>
          <button
            className="text-white hover:text-gray-200 focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            &times;
          </button>
        </div>
      )}

    {showSuccess && <SuccessPopup message="Registration successful! Redirecting to login..." />}

  </div>
);
};

export default AdminSignUpForm;
