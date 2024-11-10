import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold">About</h3>
                    <p className="text-sm">
                        We are a company dedicated to providing the best services to our customers.
                    </p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to={"/home"} className="hover:text-gray-400">Home</Link>
                        </li>
                        <li>
                            <Link to={"/about"} className="hover:text-gray-400">About</Link>
                        </li>
                        <li>
                            <Link to={"/services"} className="hover:text-gray-400">Services</Link>
                        </li>
                        <li>
                            <Link to={"/contact"} className="hover:text-gray-400">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <Link to={"/"} className="hover:text-gray-400"><FaFacebookF/></Link>
                        <Link to={"/"} className="hover:text-gray-400"><FaTwitter/></Link>
                        <Link to={"/"} className="hover:text-gray-400"><FaInstagram/></Link>
                        <Link to={"/"} className="hover:text-gray-400"><FaLinkedin/></Link>
                    </div>
                </div>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm">© {new Date().getFullYear()} My Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;