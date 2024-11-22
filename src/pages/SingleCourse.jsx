import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiAdminGetOneCourse, apiAdminDeleteCourse, apiAdminEditCourse } from '../services/auth';
import { FaEdit, FaTrash, FaUserEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const SingleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    duration: '',
    teacher: '',
    status: ''
  });

  useEffect(() => {
    if (!id) {
      console.error('No course ID provided');
      navigate('/admin/course-list');
      return;
    }
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await apiAdminGetOneCourse(id);
      setCourse(response.data);
      setEditFormData({
        name: response.data.name,
        description: response.data.description,
        duration: response.data.duration,
        teacher: response.data.teacher,
        status: response.data.status
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      setError(error.response?.data || 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const changedFields = {};
      Object.keys(editFormData).forEach(key => {
        if (editFormData[key] !== course[key]) {
          changedFields[key] = editFormData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        alert('No changes made to update');
        return;
      }

      const response = await apiAdminEditCourse(id, changedFields);
      alert(response.data.message);
      setIsEditing(false);
      fetchCourse();
    } catch (error) {
      alert(error.response?.data || 'Failed to update course');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await apiAdminDeleteCourse(id);
        alert(response.data.message);
        navigate('/admin/course-list');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete course');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!course) {
    return <div className="text-center mt-8">Course not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {!isEditing ? (
        // View Mode
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{course.name}</h1>
          
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">{course.description}</p>
            <div className="border-t pt-4">
              <p><strong>Duration:</strong> {course.duration} weeks</p>
              <p><strong>Instructor:</strong> {course.teacher}</p>
              <p>
                <strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded ${
                  course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {course.status}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleEditClick(e, course.id || course._id)}
                    className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white px-3 py-1 text-1xl rounded-md"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, course.id || course._id)}
                    className="bg-red-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Course Name</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Duration (weeks)</label>
            <input
              type="number"
              name="duration"
              value={editFormData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Instructor</label>
            <input
              type="text"
              name="teacher"
              value={editFormData.teacher}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <select
              name="status"
              value={editFormData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SingleCourse;