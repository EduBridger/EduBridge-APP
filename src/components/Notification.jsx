import React from 'react';

const Notification = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${bgColor} text-white p-4 rounded shadow-md mb-4  transition duration-300 transform hover:scale-105`}>
      <div className="flex justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
