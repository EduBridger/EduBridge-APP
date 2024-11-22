import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiAdminGetAllCourses } from '../services/auth';
import { FaPlus, FaUserEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const AdminCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiAdminGetAllCourses();
      console.log('Raw courses data:', response.data);

      const coursesArray = response.data.courses || [];
      setCourses(coursesArray);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.response?.data?.message || 'Failed to fetch courses list');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (courseId) => {
    navigate(`/admin/edit-course/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await apiAdminDeleteCourse(courseId);
        fetchCourses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
    }
  };

  const handleCourseClick = (e, course) => {
    e.stopPropagation(); // Prevent event bubbling
    if (course && (course.id || course._id)) {
      console.log('Navigating to course:', course.id || course._id);
      navigate(`/admin/course/${course.id || course._id}`);
    } else {
      console.error('Invalid course data:', course);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Courses</h1>
          <Link
            to="/admin/add-course"
            className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white font-bold py-2 px-4 text-lg flex items-center gap-2 rounded-md"
          >
            <FaPlus />Add New
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="text-center text-gray-600">No courses found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id || course._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div onClick={(e) => handleCourseClick(e, course)} className="cursor-pointer">
                  <h2 className="text-xl font-bold mb-2">{course.name}</h2>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>Duration: {course.duration} weeks</p>
                    <p>Instructor: {course.teacher}</p>
                    <p>Status: <span className={`font-semibold ${course.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {course.status}
                    </span></p>
                  </div>
                </div>
                {/* <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleEditCourse(e, course.id || course._id)}
                    className="bg-[rgba(8,42,88,0.9)] hover:bg-yellow-600 text-white px-3 py-1 text-1xl rounded-md"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={(e) => handleDeleteCourse(e, course.id || course._id)}
                    className="bg-red-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                  >
                    <FaDeleteLeft />
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseList;