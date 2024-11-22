import React, { useState, useEffect } from 'react';
import { FaSearch, FaDownload, FaEdit, FaCheck } from 'react-icons/fa';

const AdminGradeManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API calls
  useEffect(() => {
    setCourses([
      { id: 1, name: 'Mathematics' },
      { id: 2, name: 'Physics' },
      { id: 3, name: 'Chemistry' }
    ]);
  }, []);

  const fetchStudentGrades = async (courseId) => {
    setLoading(true);
    // Mock data - replace with API call
    setTimeout(() => {
      setStudents([
        {
          id: 1,
          name: 'John Doe',
          assignments: [
            { id: 1, title: 'Assignment 1', score: 85 },
            { id: 2, title: 'Mid-term', score: 78 }
          ],
          averageGrade: 81.5
        },
        {
          id: 2,
          name: 'Jane Smith',
          assignments: [
            { id: 1, title: 'Assignment 1', score: 92 },
            { id: 2, title: 'Mid-term', score: 88 }
          ],
          averageGrade: 90
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    if (courseId) {
      fetchStudentGrades(courseId);
    } else {
      setStudents([]);
    }
  };

  const handleGradeEdit = (studentId, assignmentId, currentScore) => {
    setEditingGrade({
      studentId,
      assignmentId,
      score: currentScore
    });
  };

  const handleGradeUpdate = (studentId, assignmentId, newScore) => {
    // Add API call to update grade
    setStudents(students.map(student => {
      if (student.id === studentId) {
        const updatedAssignments = student.assignments.map(assignment => {
          if (assignment.id === assignmentId) {
            return { ...assignment, score: parseInt(newScore) };
          }
          return assignment;
        });
        const newAverage = updatedAssignments.reduce((acc, curr) => acc + curr.score, 0) / updatedAssignments.length;
        return {
          ...student,
          assignments: updatedAssignments,
          averageGrade: newAverage
        };
      }
      return student;
    }));
    setEditingGrade(null);
  };

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting grades...');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Grade Management</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaDownload /> Export Grades
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={handleCourseChange}
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
            Search Student
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name..."
              className="w-full p-2 border rounded pl-10"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading grades...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                {students[0]?.assignments.map(assignment => (
                  <th key={assignment.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {assignment.title}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  {student.assignments.map(assignment => (
                    <td key={assignment.id} className="px-6 py-4 whitespace-nowrap">
                      {editingGrade?.studentId === student.id && 
                       editingGrade?.assignmentId === assignment.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editingGrade.score}
                            onChange={(e) => setEditingGrade({
                              ...editingGrade,
                              score: e.target.value
                            })}
                            className="w-20 p-1 border rounded"
                          />
                          <button
                            onClick={() => handleGradeUpdate(student.id, assignment.id, editingGrade.score)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{assignment.score}%</span>
                          <button
                            onClick={() => handleGradeEdit(student.id, assignment.id, assignment.score)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-bold ${
                      student.averageGrade >= 90 ? 'text-green-600' :
                      student.averageGrade >= 80 ? 'text-blue-600' :
                      student.averageGrade >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {student.averageGrade.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminGradeManagement; 