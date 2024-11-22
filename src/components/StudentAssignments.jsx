import React, { useState, useEffect } from 'react';
import { FaUpload, FaEye, FaCheckCircle, FaClock } from 'react-icons/fa';
import { apiGetStudentAssignments, apiSubmitStudentAssignment } from '../services/auth';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState({
    file: null,
    content: ''
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await apiGetStudentAssignments();
      setAssignments(response.data.assignments);
    } catch (error) {
      setError('Failed to fetch assignments');
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSubmission({
      ...submission,
      file: e.target.files[0]
    });
  };

  const handleContentChange = (e) => {
    setSubmission({
      ...submission,
      content: e.target.value
    });
  };

  const handleSubmit = async (assignmentId) => {
    if (!submission.file && !submission.content) {
      alert('Please provide either a file or text content for your submission');
      return;
    }

    try {
      setSubmitting(true);
      const studentId = JSON.parse(localStorage.getItem('studentInfo'))?.id;
      
      if (!studentId) {
        throw new Error('Student ID not found');
      }

      const payload = {
        assignmentId,
        file: submission.file,
        content: submission.content
      };

      await apiSubmitStudentAssignment(studentId, payload);
      alert('Assignment submitted successfully!');
      
      // Reset form and refresh assignments
      setSubmission({ file: null, content: '' });
      setSelectedAssignment(null);
      fetchAssignments();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Assignments</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{assignment.title}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                assignment.submitted 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {assignment.submitted ? 'Submitted' : 'Pending'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{assignment.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              {assignment.submitted && (
                <span className="flex items-center text-green-600">
                  <FaCheckCircle className="mr-1" /> Submitted
                </span>
              )}
            </div>

            {!assignment.submitted && (
              <div>
                {selectedAssignment === assignment.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload File (optional)
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comments (optional)
                      </label>
                      <textarea
                        value={submission.content}
                        onChange={handleContentChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedAssignment(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmit(assignment.id)}
                        disabled={submitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {submitting ? 'Submitting...' : 'Submit Assignment'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedAssignment(assignment.id)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                  >
                    <FaUpload className="mr-2" /> Submit Work
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="text-center text-gray-500">
          No assignments available at the moment.
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
