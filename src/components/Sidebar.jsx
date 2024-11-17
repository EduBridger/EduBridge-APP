import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaFileAlt,
  FaFolderOpen,
  FaGavel,
  FaArchive,
  FaCog,
  FaChartLine,
  FaQuestionCircle,
  FaSearch,
} from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside
      className={`bg-blue-600 text-white transition-all duration-300 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } flex flex-col p-4 h-full fixed`} // Sidebar container
    >
      {/* Step button fixed at the top */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="text- mb-4 font-bold text-xl absolute top-4 left-4 z-10 "
      >
        STEP
      </button>

      {/* Search bar */}
      {!isSidebarCollapsed && (
        <div className="mb-4 flex items-center bg-gray-100 rounded px-2 py-1 mt-10">
          {" "}
          {/* Adjust margin-top to account for the Step button */}
          <FaSearch className="text-gray-300 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded text-white placeholder-gray-300 border-none outline-none"
          />
        </div>
      )}

      {/* Dashboard link */}
      {!isSidebarCollapsed && (
        <Link
          to="/dashboard"
          title="Dashboard"
          className="bg-gray-100 hover:bg-yellow-500 text-blue-700 hover:text-white p-3 rounded flex items-center justify-center w-full mb-4"
        >
          <span>Dashboard</span>
        </Link>
      )}

      {/* Navigation links */}
      <nav
        className={`flex flex-col space-y-4 ${
          isSidebarCollapsed ? "items-center" : ""
        } mt-8`} // Add margin-top to avoid overlap with "Step" button and ensure proper spacing
      >
        <Link
          to="/dashboard/docs"
          title="Documents"
          className="hover:bg-yellow-500 p-2 rounded flex items-center space-x-2"
        >
          <FaFolderOpen size={24} />
          {!isSidebarCollapsed && <span>Post Documents</span>}
        </Link>
        <Link
          to="/dashboard/reports"
          title="Reports"
          className="hover:bg-yellow-500 p-2 rounded flex items-center space-x-2"
        >
          <FaFileAlt size={24} />
          {!isSidebarCollapsed && <span>Register Teacher</span>}
        </Link>
        <Link
          to="/dashboard/reports"
          title="Reports"
          className="hover:bg-yellow-500 p-2 rounded flex items-center space-x-2"
        >
          <FaFileAlt size={24} />
          {!isSidebarCollapsed && <span>Register Student</span>}
        </Link>

        <Link
          to="/dashboard/archives"
          title="Archives"
          className="hover:bg-yellow-500 p-2 rounded flex items-center space-x-2"
        >
          <FaArchive size={24} />
          {!isSidebarCollapsed && <span>Archives</span>}
        </Link>
      </nav>

      {/* Settings and Messaging & Help section at the bottom */}
      <div className="mt-48 flex flex-col space-y-4">
        <Link
          to="/dashboard/settings"
          title="Settings"
          className="hover:bg-yellow-500 p-2 rounded flex items-center space-x-2"
        >
          <FaCog size={24} />
          {!isSidebarCollapsed && <span>Settings</span>}
        </Link>
        <Link
          to="/dashboard/help"
          title="Messaging & Help"
          className="hover:bg-yellow-500 p-2 rounded flex items-center space-x-2"
        >
          <FaQuestionCircle size={24} />
          {!isSidebarCollapsed && <span>Messaging & Help</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
