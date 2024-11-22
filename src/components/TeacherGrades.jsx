import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const TeacherGrades = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setCourses([
            { id: 1, name: 'Mathematics' },
            { id: 2, name: 'Physics' },
            { id: 3, name: 'Chemistry' }
          ]);
          setStudents([
            {
              id: 1,
              name: 'John Doe',
              assignments: [
                { id: 1, title: 'Assignment 1', score: 85 },
                { id: 2, title: 'Mid-term', score: 78 }
              ]
            },
            {
              id: 2,
              name: 'Jane Smith',
              assignments: [
                { id: 1, title: 'Assignment 1', score: 92 },
                { id: 2, title: 'Mid-term', score: 88 }
              ]
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGradeEdit = (studentId, assignmentId, currentScore) => {
    setEditingGrade({
      studentId,
      assignmentId,
      score: currentScore
    });
  };

  const handleGradeUpdate = (studentId, assignmentId, newScore) => {
    // Add API call here to update grade
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          assignments: student.assignments.map(assignment => {
            if (assignment.id === assignmentId) {
              return { ...assignment, score: parseInt(newScore) };
            }
            return assignment;
          })
        };
      }
      return student;
    }));
    setEditingGrade(null);
  };

  const calculateAverage = (assignments) => {
    if (!assignments || assignments.length === 0) return 0;
    const sum = assignments.reduce((acc, curr) => acc + curr.score, 0);
    return (sum / assignments.length).toFixed(1);
  };

  if (loading) return <div>Loading grades...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Grade Management</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Course
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full md:w-auto p-2 border rounded"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(students) && students.map((student) => (
              student.assignments.map((assignment) => (
                <tr key={`${student.id}-${assignment.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingGrade?.studentId === student.id && 
                     editingGrade?.assignmentId === assignment.id ? (
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
                    ) : (
                      `${assignment.score}%`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingGrade?.studentId === student.id && 
                     editingGrade?.assignmentId === assignment.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleGradeUpdate(student.id, assignment.id, editingGrade.score)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingGrade(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleGradeEdit(student.id, assignment.id, assignment.score)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherGrades;
