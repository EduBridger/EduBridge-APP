import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminGetAllTeachers, apiAdminDeleteTeacher, apiAdminSearchTeachers } from '../services/auth';
import { FaCrosshairs, FaEraser, FaPlus, FaRemoveFormat, FaUserEdit } from 'react-icons/fa';
import { FaCross, FaDeleteLeft } from 'react-icons/fa6';
import debounce from 'lodash/debounce';

const AdminTeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((term, searchFunction) => {
      searchFunction(term);
    }, 500),
    []
  );

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiAdminGetAllTeachers();
      console.log('Raw teachers data:', response.data);

      const teachersArray = response.data.teachers || [];
      setTeachers(teachersArray);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError(error.response?.data?.message || 'Failed to fetch teachers list');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    try {
      setLoading(true);
      const response = await apiAdminSearchTeachers(term);
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error searching teachers:', error);
      setError('Failed to search teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherClick = (teacher) => {
    if (teacher && (teacher._id || teacher.id)) {
      const teacherId = teacher._id || teacher.id;
      console.log('Navigating to teacher:', teacherId);
      navigate(`/admin/teachers/${teacherId}`);
    } else {
      console.error('Invalid teacher data:', teacher);
    }
  };

  const handleEditTeacher = (e, teacher) => {
    e.stopPropagation();
    if (teacher && (teacher._id || teacher.id)) {
      const teacherId = teacher._id || teacher.id;
      navigate(`/admin/edit-teacher/${teacherId}`, { state: { teacher } });
    } else {
      console.error('Invalid teacher data:', teacher);
    }
  };

  const handleDeleteTeacher = async (e, teacherId) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        setDeleteLoading(true);
        
        console.log('Attempting to delete teacher:', teacherId);
        const response = await apiAdminDeleteTeacher(teacherId);
        
        if (response.status === 200) {
          // Refresh the teachers list after successful deletion
          fetchTeachers();
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert(error.response?.data?.message || 'Failed to delete teacher. Please try again.');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading teachers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Teachers</h1>
          <Link
            to="/admin/register-teacher"
            className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white font-bold  py-2 px-4 text-lg flex items-center gap-2  rounded-md"
          >
           <FaPlus/>Add New
          </Link>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedSearch(e.target.value, handleSearch);
            }}
            placeholder="Search by name, email or subject..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => {
              setSearchTerm('');
              fetchTeachers();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear
          </button>
        </div>

        {!Array.isArray(teachers) || teachers.length === 0 ? (
          <div className="text-center text-gray-600">No teachers found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div onClick={() => handleTeacherClick(teacher)} className="cursor-pointer">
                  <h2 className="text-xl font-bold">
                    {teacher.firstName} {teacher.lastName}
                  </h2>
                  <p className="text-gray-600">{teacher.email}</p>
                  <p className="text-gray-600">Course: {teacher.course}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleEditTeacher(e, teacher)}
                    className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white px-3 py-1 text-1xl rounded-md"
                  >
                    <Link to="/admin/edit-teacher"><FaUserEdit /></Link>
                  </button>
                  <button
                    onClick={(e) => handleDeleteTeacher(e, teacher._id)}
                    className={`${
                      deleteLoading 
                        ? 'bg-gray-500' 
                        : 'bg-red-500 hover:bg-yellow-600'
                    } text-white px-3 py-1 rounded-md flex items-center gap-1`}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <span className="animate-spin">⌛</span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FaDeleteLeft />
                        <span className="sr-only">Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeacherList;