import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCheck, FaTimes, FaDownload } from 'react-icons/fa';

const AdminAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with API calls
  useEffect(() => {
    setCourses([
      { id: 1, name: 'Mathematics' },
      { id: 2, name: 'Physics' },
      { id: 3, name: 'Chemistry' }
    ]);
  }, []);

  const fetchAttendanceData = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    setTimeout(() => {
      setAttendanceData([
        { id: 1, studentName: 'John Doe', status: 'present', time: '09:00 AM' },
        { id: 2, studentName: 'Jane Smith', status: 'absent', time: '-' },
        { id: 3, studentName: 'Bob Wilson', status: 'present', time: '09:15 AM' }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting attendance data...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
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
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status === 'present' ? (
                        <FaCheck className="mr-1" />
                      ) : (
                        <FaTimes className="mr-1" />
                      )}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => console.log('Edit attendance')}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="text-center mt-4">Loading attendance data...</div>
      )}

      {!loading && attendanceData.length === 0 && (
        <div className="text-center mt-4 text-gray-500">
          No attendance records found for the selected date and course.
        </div>
      )}
    </div>
  );
};

export default AdminAttendance; 