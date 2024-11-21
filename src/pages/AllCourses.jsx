import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminGetAllCourses } from '../services/auth';

const AdminCourseList = () => {
  const [adDatas, setAdDatas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const GetAdDatas = async () => {
      try {
        const response = await apiAdminGetAllCourses ();
        setAdDatas(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    GetAdDatas();
  }, []);

  const handleCourseClick = (adData) => {
    navigate(`/admin/courses/${adData.id}`);
  };

  return (
    <div className="bg-gray-100 ml-40 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {adDatas.map((adData) => (
            <div
              key={adData.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => handleCourseClick(adData)}
            >
              <h2 className="text-xl font-bold">{adData.title}</h2>
              <p className="text-gray-600">{adData.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseList;