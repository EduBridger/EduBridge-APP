import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { apiAdminDeleteCourse, apiAdminEditCourse, apiAdminGetOneCourse } from '../services/auth';

const AdminSingleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adData, setAdData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const GetAdData = async () => {
      try {
        const response = await apiAdminGetOneCourse(id);
        setAdData(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
        });
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    GetAdData();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditCourse = async () => {
    try {
      const adData = {
        title: formData.title,
        description: formData.description,
      };
      await apiAdminEditCourse(id, adData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await apiAdminDeleteCourse(id);
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        {adData ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={handleEditCourse}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteCourse}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminSingleCourse;