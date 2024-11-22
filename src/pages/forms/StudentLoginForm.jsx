import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiStudentLogin } from '../../services/auth';
import { Link } from 'react-router-dom';
import bg from "../../assets/image/logo.png";

const StudentLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setShowAlert(false);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password
      };

      console.log('Attempting student login with:', {
        email: payload.email,
        passwordLength: payload.password.length
      });

      const response = await apiStudentLogin(payload);

      if (response.data?.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('userRole', 'student');
        
        if (response.data.student) {
          localStorage.setItem('studentInfo', JSON.stringify(response.data.student));
        }
        
        setShowAlert(true);
        setTimeout(() => {
          navigate('/student');
        }, 2000);
      } else {
        setErrorMessage('Login failed: Authentication token not received');
      }

    } catch (error) {
      console.error('Login error:', {
        status: error.response?.status,
        message: error.response?.data
      });
      
      if (error.response?.status === 401) {
        setErrorMessage('Invalid email or password');
      } else if (error.response?.status === 400) {
        setErrorMessage('Please provide valid email and password');
      } else if (error.response?.status === 404) {
        setErrorMessage('Student account not found');
      } else {
        setErrorMessage('Login failed. Please try again later');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] h-screen mx-auto flex flex-col md:flex-row bg-[#2a557a] text-black p-8 rounded-lg">
      {/* Left Section */}
      <div className="md:w-[50%] h-[90%]">
        <img
          className="font-bold h-full w-full text-2xl pt-8 flex mb-5 items-center justify-center"
          src={bg}
          alt=""
        />
        <p>
          By logging on to EduBridge, you agree to our{' '}
          <span>
            <Link to="/" className="text-yellow-500">
              Terms
            </Link>
          </span>{' '}
          of use and{' '}
          <span>
            <Link to="/" className="text-yellow-500">
              Privacy
            </Link>
          </span>{' '}
          Policy.
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-white p-8 ml-3 w-[40%] h-[70%] mt-20 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Student Login</h2>
        
        {showAlert && (
          <div className="mb-4 bg-green-500 text-white p-3 rounded-lg">
            Login successful! Redirecting to dashboard...
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 bg-red-500 text-white p-3 rounded-lg">
            {errorMessage}
          </div>
        )}

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
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginForm;