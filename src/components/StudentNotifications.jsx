import React, { useState, useEffect } from 'react';
import { FaBell, FaEnvelope, FaCheck } from 'react-icons/fa';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API call
      setTimeout(() => {
        setNotifications([
          {
            id: 1,
            type: 'assignment',
            message: 'New assignment posted in Mathematics',
            date: '2024-11-20',
            read: false
          },
          {
            id: 2,
            type: 'grade',
            message: 'Your grade for Physics assignment has been posted',
            date: '2024-11-19',
            read: true
          },
          {
            id: 3,
            type: 'system',
            message: 'Course schedule updated',
            date: '2024-11-18',
            read: false
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Failed to fetch notifications');
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    // Add API call to mark notification as read
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
              notification.read ? 'border-gray-300' : 'border-blue-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  notification.type === 'assignment' ? 'bg-blue-100' :
                  notification.type === 'grade' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {notification.type === 'assignment' ? (
                    <FaEnvelope className="text-blue-500" />
                  ) : notification.type === 'grade' ? (
                    <FaBell className="text-green-500" />
                  ) : (
                    <FaBell className="text-yellow-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaCheck />
                </button>
              )}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center text-gray-500">
            No notifications to display
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNotifications; 