import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherAttendance = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleMarkAttendance = async (studentId, status) => {
    try {
      await axios.post(`/attendance/${studentId}`, { status });
      fetchStudents(); // Refresh attendance data
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Tracker</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="flex items-center justify-between border p-2 rounded mb-2">
            <span>{student.name}</span>
            <div>
              <button
                onClick={() => handleMarkAttendance(student.id, 'present')}
                className="bg-green-500 text-white py-1 px-3 rounded mr-2"
              >
                Present
              </button>
              <button
                onClick={() => handleMarkAttendance(student.id, 'absent')}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Absent
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherAttendance;
