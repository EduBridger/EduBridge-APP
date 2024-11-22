import React, { useState, useEffect } from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook, FaBell, FaGraduationCap, FaCalendarCheck } from 'react-icons/fa';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    activeStudents: 0,
    pendingRequests: 0,
    attendanceRate: 0,
    recentNotifications: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Simulating API call
    setTimeout(() => {
      setStats({
        totalStudents: 150,
        totalTeachers: 12,
        totalCourses: 8,
        activeStudents: 142,
        pendingRequests: 5,
        attendanceRate: 92,
        recentNotifications: [
          { id: 1, message: "New student registration", time: "2 hours ago" },
          { id: 2, message: "Course material updated", time: "5 hours ago" },
          { id: 3, message: "Teacher absence reported", time: "1 day ago" }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={FaUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={FaChalkboardTeacher}
          color="bg-green-500"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={FaBook}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          icon={FaGraduationCap}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={FaBell}
          color="bg-red-500"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon={FaCalendarCheck}
          color="bg-indigo-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Notifications</h2>
        <div className="space-y-4">
          {stats.recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center">
                <FaBell className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <FaUsers className="text-blue-500 mx-auto mb-2" />
            <span className="text-sm">Add Student</span>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FaChalkboardTeacher className="text-green-500 mx-auto mb-2" />
            <span className="text-sm">Add Teacher</span>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <FaBook className="text-purple-500 mx-auto mb-2" />
            <span className="text-sm">Add Course</span>
          </button>
          <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <FaBell className="text-yellow-500 mx-auto mb-2" />
            <span className="text-sm">Send Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 