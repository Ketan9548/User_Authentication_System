import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";


const Home = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    

    return (
        <div className="relative">
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    </NavLink>
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 dark:text-white focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className={`hidden ${isOpen ? "block" : "hidden"} md:flex md:order-2 space-x-3 rtl:space-x-reverse`}>
                        <NavLink to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login
                        </NavLink>
                        {location.pathname === '/homecontaints' ? (
                            <NavLink to="/" className="text-white bg-blue-700 ml-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                SignOut
                            </NavLink>
                        ) : (
                            <NavLink to="/register" className="text-white bg-blue-700 ml-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sign Up
                            </NavLink>
                        )}
                    </div>
                </div>
                <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600`}>
                    <ul className="flex flex-col p-4 space-y-2">
                        <li>
                            <NavLink to="/" className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
