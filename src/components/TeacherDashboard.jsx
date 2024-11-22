import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

const TeacherDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
       <div className="w-full justify-center fixed  bg-[rgba(8,42,88,0.9)] items-center text-white ">
      <h1 className="text-3xl font-bold text-center">Teacher Dashboard</h1>
      <p className="animate-bounce text-center">Welcome, Teacher! Manage your class efficiently.</p>
      </div>
      <TeacherSidebar />
      <main className="flex-1 p-4 lg:ml-20 hover:lg:ml-64 transition-all duration-300">
        <div className="container mx-auto mt-16 lg:mt-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
