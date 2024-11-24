import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[rgba(8,42,88,0.9)] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            About EduBridge
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Empowering Education Through Technology Solutions. Providing innovative educational tools for students and teachers.
                        </p>
                        <div className="space-y-2 text-gray-300">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-400" />
                                <span>123 Bohye Street, Accra</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-blue-400" />
                                <span>+1 234 567 8900</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-400" />
                                <span>info@edubridge.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/home" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Login Portals */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            Login Portals
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/student-login" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    Student Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/teacher-login" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    Teacher Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin-login" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-400 pb-2 inline-block">
                            Connect With Us
                        </h3>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors duration-300">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors duration-300">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors duration-300">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors duration-300">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-12 pt-8 border-t border-gray-700">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} EduBridge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;