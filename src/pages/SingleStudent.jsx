import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiAdminGetOneStudent, apiAdminDeleteStudent, apiAdminEditStudent } from '../services/auth';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SingleStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: ''
  });

  useEffect(() => {
    if (!id) {
      console.error('No student ID provided');
      navigate('/admin/student-list');
      return;
    }
    console.log('Fetching student with ID:', id);
    fetchStudent();
  }, [id, navigate]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await apiAdminGetOneStudent(id);
      setStudent(response.data);
      setEditFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        course: response.data.course
      });
    } catch (error) {
      console.error('Error fetching student:', error);
      setError(error.response?.data || 'Failed to load student details');
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
        if (editFormData[key] !== student[key]) {
          changedFields[key] = editFormData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        alert('No changes made');
        return;
      }

      const response = await apiAdminEditStudent(id, changedFields);
      alert(response.data.message);
      setIsEditing(false);
      fetchStudent();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update student');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await apiAdminDeleteStudent(id);
        alert('Student deleted successfully');
        navigate('/admin/student-list');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete student');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!student) return <div className="text-center mt-8">Student not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {!isEditing ? (
        // View Mode
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {student.firstName} {student.lastName}
            </h1>
            <div className="space-x-2">
              <button
                onClick={handleEditClick}
                className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <FaEdit className="inline mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                <FaTrash className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-t pt-4">
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Role:</strong> {student.role}</p>
            </div>
          </div>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editFormData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Course</label>
            <input
              type="text"
              name="course"
              value={editFormData.course}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
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

export default SingleStudent;