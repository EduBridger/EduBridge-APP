import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiAdminGetAllStudents, apiAdminUpdateStudent, apiAdminDeleteStudent } from '../../services/auth';

const AdminSingleStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await apiAdminGetAllStudents();
        setStudents(response.data);
        const student = response.data.find((s) => s.id === parseInt(studentId));
        setSelectedStudent(student);
        setFormData({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        });
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [studentId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditStudent = async () => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      await apiAdminUpdateStudent(selectedStudent.id, payload);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      await apiAdminDeleteStudent(selectedStudent.id);
      navigate('/admin/students');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        {selectedStudent ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleEditStudent}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteStudent}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{selectedStudent.firstName} {selectedStudent.lastName}</h1>
                <p className="text-gray-600 mb-4">{selectedStudent.email}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteStudent}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminSingleStudent;