import React, { useState, useEffect } from 'react';
import { FaBook, FaVideo, FaFile, FaUpload, FaTrash } from 'react-icons/fa';

const TeacherMaterials = () => {
  const [materials, setMaterials] = useState({
    lectures: [],
    assignments: [],
    readings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [uploadType, setUploadType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Mock data - replace with API call
    setCourses([
      { id: 1, name: 'Mathematics' },
      { id: 2, name: 'Physics' },
      { id: 3, name: 'Chemistry' }
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchMaterials();
    }
  }, [selectedCourse]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API call
      setMaterials({
        lectures: [
          { id: 1, title: 'Introduction to Calculus', type: 'video', fileUrl: '#' },
          { id: 2, title: 'Derivatives', type: 'video', fileUrl: '#' }
        ],
        assignments: [
          { id: 1, title: 'Week 1 Problems', type: 'pdf', fileUrl: '#' },
          { id: 2, title: 'Practice Questions', type: 'pdf', fileUrl: '#' }
        ],
        readings: [
          { id: 1, title: 'Chapter 1: Basics', type: 'pdf', fileUrl: '#' },
          { id: 2, title: 'Additional Reading', type: 'pdf', fileUrl: '#' }
        ]
      });
    } catch (error) {
      setError('Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !title || !uploadType) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Add API call to upload material
      alert('Material uploaded successfully!');
      setSelectedFile(null);
      setTitle('');
      setUploadType('');
      fetchMaterials();
    } catch (error) {
      alert('Failed to upload material');
    }
  };

  const handleDelete = async (materialId, type) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        // Add API call to delete material
        alert('Material deleted successfully!');
        fetchMaterials();
      } catch (error) {
        alert('Failed to delete material');
      }
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

  if (loading) return <div>Loading materials...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Course Materials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2">Upload New Material</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Material title"
                className="w-full p-2 border rounded"
              />
              <select
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="lecture">Lecture</option>
                <option value="assignment">Assignment</option>
                <option value="reading">Reading</option>
              </select>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              <button
                onClick={handleUpload}
                className="w-full bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <FaUpload className="inline mr-2" />
                Upload Material
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedCourse && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Lectures</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.lectures.map((material) => (
                <div key={material.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIcon(material.type)}
                      <span className="font-medium">{material.title}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(material.id, 'lecture')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Assignments</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.assignments.map((material) => (
                <div key={material.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIcon(material.type)}
                      <span className="font-medium">{material.title}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(material.id, 'assignment')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Readings</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.readings.map((material) => (
                <div key={material.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIcon(material.type)}
                      <span className="font-medium">{material.title}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(material.id, 'reading')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherMaterials; 