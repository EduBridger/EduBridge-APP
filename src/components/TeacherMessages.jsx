import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaReply, FaTrash } from 'react-icons/fa';

const TeacherMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            from: 'John Doe',
            subject: 'Question about assignment',
            content: 'I need clarification on the last homework...',
            date: '2024-02-20',
            read: false
          },
          {
            id: 2,
            from: 'Jane Smith',
            subject: 'Absence notification',
            content: 'I will be absent next week due to...',
            date: '2024-02-19',
            read: true
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Failed to fetch messages');
      setLoading(false);
    }
  };

  const handleReply = async (messageId) => {
    // Add API call to send reply
    alert('Reply sent successfully!');
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      // Add API call to delete message
      setMessages(messages.filter(message => message.id !== messageId));
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white p-4 rounded-lg shadow-md ${
              !message.read ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold">{message.subject}</h3>
                <p className="text-sm text-gray-500">From: {message.from}</p>
                <p className="text-sm text-gray-500">{message.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMessage(message)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaReply />
                </button>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{message.content}</p>

            {selectedMessage?.id === message.id && (
              <div className="mt-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-2 border rounded"
                  rows="3"
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(message.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center text-gray-500">
            No messages to display
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMessages; 