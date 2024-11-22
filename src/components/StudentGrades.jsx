import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { apiGetStudentGrades } from '../services/auth';

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await apiGetStudentGrades();
      setGrades(response.data.grades);
      setAverageScore(response.data.averageScore);
    } catch (error) {
      setError('Failed to fetch grades');
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLabel = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  if (loading) return <div>Loading grades...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <FaGraduationCap className="mr-2" />
            Academic Performance
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Average</p>
            <p className={`text-2xl font-bold ${getGradeColor(averageScore)}`}>
              {averageScore.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Courses</p>
            <p className="text-xl font-bold text-blue-600">{grades.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Assignments Completed</p>
            <p className="text-xl font-bold text-green-600">{grades.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Current Standing</p>
            <p className={`text-xl font-bold ${getGradeColor(averageScore)}`}>
              {getGradeLabel(averageScore)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {grades.map((grade) => (
            <div key={grade.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{grade.courseId.name}</h3>
                  <p className="text-sm text-gray-600">Course Code: {grade.courseId.code}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getGradeColor(grade.score)}`}>
                    {grade.score}%
                  </span>
                  <p className="text-sm text-gray-600">
                    Grade: {getGradeLabel(grade.score)}
                  </p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-semibold">Assignment:</span> {grade.assignmentId.title}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Submitted:</span> {new Date(grade.assignmentId.submissionDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Graded:</span> {new Date(grade.gradedDate).toLocaleDateString()}
                </p>
              </div>

              {grade.feedback && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-sm">
                    <FaCheckCircle className="inline text-blue-500 mr-1" />
                    <span className="font-semibold">Feedback:</span> {grade.feedback}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaChartLine className="mr-2" />
          Progress Overview
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          {/* Add a chart or progress visualization here */}
          Progress chart will be implemented here
        </div>
      </div>
    </div>
  );
};

export default StudentGrades; 