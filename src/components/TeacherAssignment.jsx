import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '' });

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleCreateAssignment = async () => {
    try {
      await axios.post('/assignments', newAssignment);
      fetchAssignments(); // Refresh the assignments list
      setNewAssignment({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Assignments</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newAssignment.description}
          onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <button onClick={handleCreateAssignment} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Assignment
        </button>
      </div>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id} className="border p-2 rounded mb-2">
            <h3 className="font-bold">{assignment.title}</h3>
            <p>{assignment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherAssignments;
