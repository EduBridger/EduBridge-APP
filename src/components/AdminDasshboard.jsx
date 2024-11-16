import React from 'react';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  return (
    <div className="p-6 ">
        
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin! Manage your school efficiently.</p>
      <Sidebar/>
    </div>
  );
};

export default AdminDashboard;
