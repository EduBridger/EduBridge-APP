import React, { useState } from 'react';
import axios from 'axios';

const DeleteCourse = ({ courseId }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3800/admin/course/delete?id=${courseId}`, {
        headers: {
          Authorization: 'Bearer <your_access_token_here>',
        },
      });

      if (response.data.success) {
        // Handle successful course deletion, e.g., show a success message
        setShowAlert(true);
        setShowConfirmation(false);
      } else {
        // Handle course deletion failure, e.g., display an error message
        console.error('Course deletion failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Delete Course</h2>
        {showConfirmation ? (
          <div>
            <p>Are you sure you want to delete this course?</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 focus:outline-none"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => setShowConfirmation(true)}
          >
            Delete Course
          </button>
        )}
        {showAlert && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 flex justify-between items-center">
            <p>Course deleted successfully.</p>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteCourse;