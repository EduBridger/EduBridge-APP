import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminGetAllTeachers } from '../services/auth';


const AdminTeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await apiAdminGetAllTeachers();
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, []);

  const handleTeacherClick = (teacher) => {
    navigate(`/admin/teachers/${teacher.id}`);
  };

//   const handleDeleteTeacher = async (id) => {
//     try {
//       await apiAdminDeleteT(id);
//       setStudents(students.filter((student) => student.id !== id));
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Teachers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => handleTeacherClick(teacher)}
            >
              <h2 className="text-xl font-bold">{teacher.firstName} {teacher.lastName}</h2>
              <p className="text-gray-600">{teacher.email}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTeacher(teacher.id);
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

export default AdminTeacherList;