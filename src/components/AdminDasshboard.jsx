import React from "react";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
    <div className="w-full justify-center fixed  bg-[rgba(8,42,88,0.9)] items-center text-white ">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <p className="animate-bounce text-center">Welcome, Admin! Manage your school efficiently.</p>
      </div>
      <div className="pt-[60px]"><Sidebar /></div>
      <div className="lg:pl-40 bg-gray-100"><Outlet/></div>
   
    </div>
  );
};

export default AdminDashboard;
