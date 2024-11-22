import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const TeacherAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setStudents([
            { id: 1, name: 'John Doe', present: true },
            { id: 2, name: 'Jane Smith', present: false },
            { id: 3, name: 'Bob Wilson', present: true }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedDate]);

  const handleAttendanceChange = (studentId) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, present: !student.present } : student
    ));
  };

  if (loading) return <div>Loading attendance data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Attendance Management</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full md:w-auto p-2 border rounded"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(students) && students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.present ? (
                      <><FaCheck className="mr-1" /> Present</>
                    ) : (
                      <><FaTimes className="mr-1" /> Absent</>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleAttendanceChange(student.id)}
                    className={`px-3 py-1 rounded-md text-white ${
                      student.present ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {student.present ? 'Mark Absent' : 'Mark Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAttendance;
