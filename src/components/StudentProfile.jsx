import React, { useState, useEffect } from 'react';
import { apiUpdateStudentProfile, apiCompleteStudentProfile } from '../services/auth';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo') || '{}');
    if (studentInfo) {
      setProfile(studentInfo);
      setFormData({
        firstName: studentInfo.firstName || '',
        lastName: studentInfo.lastName || '',
        phoneNumber: studentInfo.phoneNumber || '',
        address: studentInfo.address || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const studentId = profile.id || profile._id;
      const response = await apiUpdateStudentProfile(studentId, formData);
      
      // Update local storage with new data
      localStorage.setItem('studentInfo', JSON.stringify(response.data.student));
      setProfile(response.data.student);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    setLoading(true);
    try {
      const studentId = profile.id || profile._id;
      const response = await apiCompleteStudentProfile(studentId, formData);
      
      localStorage.setItem('studentInfo', JSON.stringify(response.data.student));
      setProfile(response.data.student);
      alert('Profile completed successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to complete profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Student Profile</h2>
      
      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-semibold">{profile?.firstName} {profile?.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">{profile?.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone Number</p>
            <p className="font-semibold">{profile?.phoneNumber || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600">Address</p>
            <p className="font-semibold">{profile?.address || 'Not provided'}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              rows="3"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentProfile; 