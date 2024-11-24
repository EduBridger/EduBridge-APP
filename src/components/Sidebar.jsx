import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBook, FaChalkboardTeacher, FaGraduationCap, FaBars, FaTimes, FaChevronDown, FaChevronUp, FaBell, FaSignOutAlt, FaList, FaPlus, FaUserPlus, FaUsers, FaPaperPlane, FaBullhorn, FaEnvelope, FaChartPie, FaHome, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import logo from '../assets/image/logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaChartPie />,
      submenu: [
        { title: 'Overview', path: '/admin', icon: <FaHome /> },
        { title: 'Grades', path: '/admin/grades', icon: <FaChartLine /> },
        { title: 'Attendance', path: '/admin/attendance', icon: <FaCalendarCheck /> },
      ]
    },
    {
      title: 'Courses',
      icon: <FaBook />,
      submenu: [
        { title: 'View All Courses', path: '/admin/course-list', icon: <FaList /> },
        { title: 'Add Course', path: '/admin/add-course', icon: <FaPlus /> },
      ]
    },
    {
      title: 'Teachers',
      icon: <FaChalkboardTeacher />,
      submenu: [
        { title: 'View All Teachers', path: '/admin/teacher-list', icon: <FaUsers /> },
        { title: 'Add Teacher', path: '/admin/register-teacher', icon: <FaUserPlus /> },
        { title: 'Send Notification', path: '/admin/notify-teachers', icon: <FaPaperPlane /> },
      ]
    },
    {
      title: 'Students',
      icon: <FaGraduationCap />,
      submenu: [
        { title: 'View All Students', path: '/admin/student-list', icon: <FaUsers /> },
        { title: 'Add Student', path: '/admin/register-student', icon: <FaUserPlus /> },
        { title: 'Send Notification', path: '/admin/notify-students', icon: <FaPaperPlane /> },
      ]
    },
    {
      title: 'Notifications',
      icon: <FaBell />,
      submenu: [
        { title: 'All Notifications', path: '/admin/notifications', icon: <FaEnvelope /> },
        { title: 'Send Broadcast', path: '/admin/send-broadcast', icon: <FaBullhorn /> },
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    }
  };

  return (
   <div>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md lg:hidden text-white bg-[rgba(8,42,88,0.9)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[rgba(8,42,88,0.9)] text-white transform transition-all duration-300 ease-in-out z-40 
          ${isOpen || isHovered ? 'w-64' : 'w-20'} lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-0'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo/Header */}
        <div className="p-4  mt-20 ">
          <div className="flex items-center justify-center">
            <img 
              src={logo} 
              alt="Logo" 
              className={`transition-all duration-300 ${
                !isOpen && !isHovered ? 'w-12 h-12' : 'w-32 h-32'
              } object-contain`}
            />
          </div>
          {/* <h2 className={`text-2xl font-bold text-center mt-2 whitespace-nowrap overflow-hidden transition-all duration-300 ${
            !isOpen && !isHovered ? 'opacity-0' : 'opacity-100'
          }`}>
            Admin Dashboard
          </h2> */}
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <div key={item.title}>
              <button
                onClick={() => toggleDropdown(item.title)}
                className="w-full flex items-center justify-between px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <div className="flex items-center min-w-max">
                  <span className="mr-3">{item.icon}</span>
                  <span className={`transition-all duration-300 ${!isOpen && !isHovered ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    {item.title}
                  </span>
                </div>
                {(isOpen || isHovered) && (
                  <span className="transition-transform duration-200">
                    {openDropdown === item.title ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openDropdown === item.title && (isOpen || isHovered) ? 'max-h-48' : 'max-h-0'
                }`}
              >
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center pl-12 py-2 text-sm hover:bg-blue-700 transition-colors duration-200
                      ${isActive(subItem.path) ? 'bg-blue-700' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-2">{subItem.icon}</span>
                    <span className={`transition-all duration-300 ${!isOpen && !isHovered ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                      {subItem.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-6 border-t border-gray-600">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-center bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            <span className={`transition-all duration-300 ${!isOpen && !isHovered ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Wrapper */}
      {/* <div className={`lg:ml-${isOpen || isHovered ? '64' : '20'} transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}> */}
        {/* Your main content goes here */}
      {/* </div> */}
      </div>
  );
};

export default Sidebar;
