import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    course: ''
  });

  useEffect(() => {
    // Mock data - replace with API call
    setCourses([
      { id: 1, name: 'Mathematics' },
      { id: 2, name: 'Physics' },
      { id: 3, name: 'Chemistry' }
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchAssignments();
    }
  }, [selectedCourse]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API call
      setTimeout(() => {
        setAssignments([
          {
            id: 1,
            title: 'Chapter 1 Problems',
            description: 'Complete exercises 1-10',
            dueDate: '2024-03-01',
            status: 'active'
          },
          {
            id: 2,
            title: 'Mid-term Project',
            description: 'Research paper on selected topic',
            dueDate: '2024-03-15',
            status: 'active'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Failed to fetch assignments');
      setLoading(false);
    }
  };

  const handleAddAssignment = () => {
    // Add validation here
    if (!newAssignment.title || !newAssignment.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Mock API call - replace with actual API
    setAssignments([...assignments, { ...newAssignment, id: Date.now(), status: 'active' }]);
    setIsAddingNew(false);
    setNewAssignment({ title: '', description: '', dueDate: '', course: '' });
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    }
  };

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add New Assignment
        </button>
      </div>

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

      {isAddingNew && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">New Assignment</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAssignment}
                className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {Array.isArray(assignments) && assignments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{assignment.description}</p>
              <p className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <div className="mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {assignment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No assignments found. Select a course or add new assignments.
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
