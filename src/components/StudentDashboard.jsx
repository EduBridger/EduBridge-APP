import React from "react";
import Sidebar from "./Sidebar1";

const StudentDashboard = () => {
  const links = [
    { label: "Assignments", path: "/student/assignments" },
    { label: "Course Materials", path: "/student/materials" },
    { label: "Goals", path: "/student/goals" },
    { label: "Messages", path: "/student/messages" },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
        <p>Welcome! Stay on top of your studies and collaborate with peers.</p>
        {/* Add additional student features here */}
      </div>
    </div>
  );
};

export default StudentDashboard;
