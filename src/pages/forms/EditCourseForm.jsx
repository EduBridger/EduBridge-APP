import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCourseForm = ({ courseId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 0,
    teacher: '',
    status: 'active',
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3800/admin/course?id=${courseId}`, {
          headers: {
            Authorization: 'Bearer <your_access_token_here>',
          },
        });

        if (response.data.success) {
          setFormData(response.data.course);
        } else {
          console.error('Error fetching course data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3800/admin/course/update?id=${courseId}`, formData, {
        headers: {
          Authorization: 'Bearer <your_access_token_here>',
        },
      });

      if (response.data.success) {
        // Handle successful course update, e.g., show a success message
        setShowAlert(true);
      } else {
        // Handle course update failure, e.g., display an error message
        console.error('Course update failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating course:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields similar to the AddCourseForm */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Course
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 focus:outline-none"
              onClick={() => setFormData({
                name: '',
                description: '',
                duration: 0,
                teacher: '',
                status: 'active',
              })}
            >
              Clear form
            </button>
          </div>
        </form>
        {showAlert && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 flex justify-between items-center">
            <p>Course updated successfully.</p>
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

export default EditCourseForm;