import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationForm = ({ type }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'normal',
    recipients: type // 'students' or 'teachers'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Add your notification API call here
      console.log('Sending notification:', formData);
      
      // Show success message
      alert('Notification sent successfully!');
      navigate(-1); // Go back to previous page
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Send Notification to {type === 'students' ? 'Students' : 'Teachers'}
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Notification'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm; 