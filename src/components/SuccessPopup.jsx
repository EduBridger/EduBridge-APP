import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPopup = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center transform transition-all">
        <div className="mb-4 bg-green-100 rounded-full p-3">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Success!</h3>
        <p className="text-gray-600 text-center mb-4">{message}</p>
        <div className="text-sm text-gray-500">Redirecting...</div>
      </div>
    </div>
  );
};

export default SuccessPopup; 