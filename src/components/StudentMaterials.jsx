import React, { useState, useEffect } from 'react';
import { FaBook, FaVideo, FaFile, FaDownload } from 'react-icons/fa';
import { apiGetCourseMaterials } from '../services/auth';

const StudentMaterials = () => {
  const [materials, setMaterials] = useState({
    lectures: [],
    assignments: [],
    readings: [],
    additionalMaterials: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseMaterials(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourseMaterials = async (courseId) => {
    try {
      setLoading(true);
      const response = await apiGetCourseMaterials(courseId);
      setMaterials(response.data.materials);
    } catch (error) {
      setError('Failed to fetch course materials');
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'video':
        return <FaVideo className="text-blue-500" />;
      case 'pdf':
        return <FaFile className="text-red-500" />;
      default:
        return <FaBook className="text-green-500" />;
    }
  };

  const MaterialCard = ({ title, type, fileUrl }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon(type)}
          <span className="font-medium">{title}</span>
        </div>
        <button 
          onClick={() => window.open(fileUrl, '_blank')}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaDownload />
        </button>
      </div>
    </div>
  );

  if (loading && !selectedCourse) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Course Materials</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Course
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading materials...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : selectedCourse ? (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Lectures</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.lectures.map((material) => (
                <MaterialCard key={material.id} {...material} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Assignments</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.assignments.map((material) => (
                <MaterialCard key={material.id} {...material} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Readings</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.readings.map((material) => (
                <MaterialCard key={material.id} {...material} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Additional Materials</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.additionalMaterials.map((material) => (
                <MaterialCard key={material.id} {...material} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Please select a course to view materials
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
