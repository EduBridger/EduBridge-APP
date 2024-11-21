import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminDeleteStudent, apiAdminGetAllStudents } from '../services/auth';


const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await apiAdminGetAllStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleStudentClick = (student) => {
    navigate(`/admin/students/${student.id}`);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await apiAdminDeleteStudent(id);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Students</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => handleStudentClick(student)}
            >
              <h2 className="text-xl font-bold">{student.firstName} {student.lastName}</h2>
              <p className="text-gray-600">{student.email}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteStudent(student.id);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentList;