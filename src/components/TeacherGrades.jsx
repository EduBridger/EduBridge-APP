import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherGrades = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleUpdateGrade = async (studentId, grade) => {
    try {
      await axios.post(`/grades/${studentId}`, { grade });
      fetchStudents(); // Refresh student data
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  const handleGradeChange = (studentId, grade) => {
    setGrades({ ...grades, [studentId]: grade });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Grades</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="flex items-center justify-between border p-2 rounded mb-2">
            <span>{student.name}</span>
            <div className="flex items-center">
              <input
                type="number"
                value={grades[student.id] || ''}
                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                className="border rounded p-1 mr-2"
              />
              <button
                onClick={() => handleUpdateGrade(student.id, grades[student.id])}
                className="bg-blue-500 text-white py-1 px-3 rounded"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherGrades;
