import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaBook, 
  FaClipboardList, 
  FaUserGraduate, 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp, 
  FaBell, 
  FaSignOutAlt,
  FaList,
  FaCalendarAlt,
  FaGraduationCap,
  FaFileAlt,
  FaEnvelope,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaChartLine
} from 'react-icons/fa';
import logo from '../assets/image/logo.png';

const TeacherSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    {
      title: 'Class Management',
      icon: <FaChalkboardTeacher />,
      submenu: [
        { title: 'Assignments', path: '/teacher/assignments', icon: <FaClipboardList /> },
        { title: 'Materials', path: '/teacher/materials', icon: <FaBook /> },
      ]
    },
    {
      title: 'Student Records',
      icon: <FaUserGraduate />,
      submenu: [
        { title: 'Attendance', path: '/teacher/attendance', icon: <FaCalendarCheck /> },
        { title: 'Grades', path: '/teacher/grades', icon: <FaChartLine /> },
      ]
    },
    {
      title: 'Communication',
      icon: <FaBell />,
      submenu: [
        { title: 'Notifications', path: '/teacher/notifications', icon: <FaEnvelope /> },
        { title: 'Student Messages', path: '/teacher/messages', icon: <FaEnvelope /> },
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
      navigate('/teacher-login');
    }
  };

  return (
    <>
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
       
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )} 

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[rgba(8,42,88,0.9)] text-white transform transition-all duration-300 ease-in-out z-40 
          ${isOpen || isHovered ? 'w-64' : 'w-20'} 
          lg:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo/Header */}
        <div className="p-4 mt-20 border-b border-gray-600">
          <div className="flex items-center justify-center">
            <img 
              src={logo} 
              alt="Logo" 
              className={`transition-all duration-300 ${
                !isOpen && !isHovered ? 'w-12 h-12' : 'w-32 h-32'
              } object-contain`}
            />
          </div>
          <h2 className={`text-2xl font-bold text-center mt-2 whitespace-nowrap overflow-hidden transition-all duration-300 ${
            !isOpen && !isHovered ? 'opacity-0' : 'opacity-100'
          }`}>
            Teacher Dashboard
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <div key={item.title}>
              <button
                onClick={() => toggleDropdown(item.title)}
                className="w-full flex items-center justify-between px-6 py-3 text-lg hover:bg-blue-800 transition-colors duration-200"
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
      </aside>
    </>
  );
};

export default TeacherSidebar; 