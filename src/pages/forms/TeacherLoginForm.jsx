import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaLock, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import logo from '../../assets/image/logo.png';
import { apiTeacherLogin } from '../../services/auth';
import SuccessPopup from '../../components/SuccessPopup';

const TeacherLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await apiTeacherLogin(formData);
      if (response.data.token) {
        setShowSuccess(true);
        localStorage.setItem('accessToken', response.data.token);
        setTimeout(() => {
          navigate('/teacher');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-full'>
    {showSuccess && <SuccessPopup message="Login successful! Redirecting to dashboard..." />}
    <div className="border bg-[rgba(8,42,88,0.9)] rounded-md shadow-md h-full w-[40%]  mx-auto">
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto h-24 w-auto mb-4 transform hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Teacher Portal</h2>
            <p className="text-gray-600">Welcome back, educator!</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelopeOpen className="h-5 w-5 text-gray-400" />
                </div>
                <div className='bg-[rgba(8,42,88,0.9)]'>
                  <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-full   w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none mx- sm:text-sm transition-all duration-300"
                  placeholder="Enter your email"
                /></div>
                
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <div className='bg-[rgba(8,42,88,0.9)]'>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rounded-full  w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm transition-all duration-300"
                  placeholder="Enter your password"
                /></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[rgba(8,42,88,0.9)] focus:ring-[rgba(8,42,88,0.9)] border-gray-300 rounded transition-all duration-300"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/teacher/forgot-password" className="font-medium text-[rgba(8,42,88,0.9)] hover:text-blue-500 transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[rgba(8,42,88,0.9)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(8,42,88,0.9)] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaChalkboardTeacher className="mr-2" />
                  Sign In as Teacher
                </div>
              )}
            </button>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/admin-login"
                className="text-sm text-[rgba(8,42,88,0.9)] hover:text-blue-500 transition-colors duration-300"
              >
                Admin Login
              </Link>
              <span className="hidden sm:block text-gray-300">|</span>
              <Link 
                to="/student-login"
                className="text-sm text-[rgba(8,42,88,0.9)] hover:text-blue-500 transition-colors duration-300"
              >
                Student Login
              </Link>
            </div>

            <div className="text-center mt-4">
              <Link 
                to="/"
                className="text-sm text-gray-600 hover:text-[rgba(8,42,88,0.9)] transition-colors duration-300 inline-flex items-center"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TeacherLoginForm;