import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAdminAddCourse } from '../../services/auth';

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    teacher: '',
    status: 'active'  // Default status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

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
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Admin authentication required');
      }

      // Convert duration to number
      const payload = {
        ...formData,
        duration: parseInt(formData.duration, 10)
      };

      console.log('Submitting course:', payload);
      const response = await apiAdminAddCourse(payload);
      
      setShowAlert(true);
      setTimeout(() => {
        navigate('/admin/course-list');
      }, 2000);
    } catch (error) {
      console.error('Error adding course:', error);
      setError(error.response?.data?.message || 'Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Course</h2>
      
      {showAlert && (
        <div className="mb-4 bg-green-500 text-white p-3 rounded">
          Course added successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-500 text-white p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Duration (in weeks)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Instructor</label>
          <input
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Adding Course...' : 'Add Course'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/course-list')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;