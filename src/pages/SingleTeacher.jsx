import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiAdminGetOneTeacher, apiAdminDeleteTeacher } from '../services/auth';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SingleTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error('No teacher ID provided');
      navigate('/admin/teacher-list');
      return;
    }
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await apiAdminGetOneTeacher(id);
      setTeacher(response.data);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      setError('Failed to load teacher details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/edit-teacher/${id}`, { state: { teacher } });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await apiAdminDeleteTeacher(id);
        navigate('/admin/teacher-list');
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Failed to delete teacher');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!teacher) {
    return <div className="text-center mt-8">Teacher not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {teacher.firstName} {teacher.lastName}
        </h1>
        <div className="space-x-2">
          <button
            onClick={handleEdit}
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
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>Course:</strong> {teacher.course}</p>
          <p><strong>Role:</strong> {teacher.role}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${
              teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {teacher.status || 'Active'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTeacher; 