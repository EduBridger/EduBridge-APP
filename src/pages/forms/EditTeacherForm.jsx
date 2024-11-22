import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { apiAdminEditTeacher } from '../../services/auth';

const EditTeacherForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: ''
  });

  useEffect(() => {
    if (!location.state?.teacher) {
      console.error('No teacher data provided');
      navigate('/admin/teacher-list');
      return;
    }

    const { teacher } = location.state;
    setFormData({
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      email: teacher.email || '',
      course: teacher.course || ''
    });
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Only send fields that have been changed
      const updatedFields = {};
      const originalTeacher = location.state?.teacher || {};

      Object.keys(formData).forEach(key => {
        if (formData[key] && formData[key] !== originalTeacher[key]) {
          updatedFields[key] = formData[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        setError('No changes made');
        setLoading(false);
        return;
      }

      console.log('Sending update with:', updatedFields);
      await apiAdminEditTeacher(id, updatedFields);
      
      navigate('/admin/teacher-list');
    } catch (error) {
      console.error('Error updating teacher:', error);
      setError(error.response?.data?.message || 'Failed to update teacher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Teacher</h2>
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Teacher'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/teacher-list')}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTeacherForm; 