import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Notification from './Notification';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submission, setSubmission] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/assignments');
      setAssignments(response.data);
      setLoading(false);
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to load assignments' });
      setLoading(false);
    }
  };

  const handleSubmit = async (assignmentId) => {
    setLoading(true);
    try {
      await axios.post(`/assignments/${assignmentId}/submit`, { content: submission });
      setNotification({ type: 'success', message: 'Assignment submitted successfully!' });
      setSubmission('');
      setLoading(false);
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to submit assignment' });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id} className="border p-4 rounded mb-4">
              <h3 className="font-bold">{assignment.title}</h3>
              <p>{assignment.description}</p>
              <textarea
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                placeholder="Write your answer here..."
                className="border p-2 rounded w-full mt-2"
              ></textarea>
              <button
                onClick={() => handleSubmit(assignment.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
              >
                Submit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentAssignments;
