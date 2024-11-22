import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminGetAllStudents, apiAdminDeleteStudent, apiAdminSearchStudents } from '../services/auth';
import { FaPlus, FaUserEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import debounce from 'lodash/debounce';

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
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
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiAdminGetAllStudents();
      console.log('Raw students data:', response.data);

      const studentsArray = response.data.students || [];
      setStudents(studentsArray);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(error.response?.data?.message || 'Failed to fetch students list');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    try {
      setLoading(true);
      const response = await apiAdminSearchStudents(term);
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error searching students:', error);
      setError('Failed to search students');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = (student) => {
    if (student && (student._id || student.id)) {
      const studentId = student._id || student.id;
      console.log('Navigating to student:', studentId);
      navigate(`/admin/students/${studentId}`);
    } else {
      console.error('Invalid student data:', student);
    }
  };

  const handleEditStudent = (e, student) => {
    e.stopPropagation();
    navigate(`/admin/edit-student/${student._id}`, { state: { student } });
  };

  const handleDeleteStudent = async (e, studentId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setDeleteLoading(true);
        await apiAdminDeleteStudent(studentId);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Students</h1>
          <Link
            to="/admin/register-student"
            className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white font-bold py-2 px-4 text-lg flex items-center gap-2 rounded-md"
          >
            <FaPlus />Add New
          </Link>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                debouncedSearch(e.target.value, handleSearch);
              }}
              placeholder="Search by name, email or course..."
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => {
                setSearchTerm('');
                fetchStudents();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </form>

        {students.length === 0 ? (
          <div className="text-center text-gray-600">No students found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {students.map((student) => (
              <div
                key={student._id || student.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div onClick={() => handleStudentClick(student)} className="cursor-pointer">
                  <h2 className="text-xl font-bold">
                    {student.firstName} {student.lastName}
                  </h2>
                  <p className="text-gray-600">{student.email}</p>
                  <p className="text-gray-600">Course: {student.course}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleEditStudent(e, student)}
                    className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white px-3 py-1 text-1xl rounded-md"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={(e) => handleDeleteStudent(e, student._id || student.id)}
                    className="bg-red-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                    disabled={deleteLoading}
                  >
                    <FaDeleteLeft />
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

export default AdminStudentList;