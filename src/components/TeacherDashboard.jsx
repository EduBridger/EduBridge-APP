import React from "react";
import Sidebar from "./Sidebar1";

const TeacherDashboard = () => {
  const links = [
    { label: "Assignments", path: "/teacher/assignments" },
    { label: "Attendance", path: "/teacher/attendance" },
    { label: "Grades", path: "/teacher/grades" },
    { label: "Messages", path: "/teacher/messages" },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
        <p>Welcome! Manage your classes and assignments here.</p>
        {/* Add additional teacher features here */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
