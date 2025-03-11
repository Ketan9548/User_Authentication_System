import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Registration = () => {
    const [data, setdata] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>
                    <form>
                        <label className="block mb-2 font-medium">Username</label>
                        <input
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="block mt-4 mb-2 font-medium">Email</label>
                        <input
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="block mt-4 mb-2 font-medium">Password</label>
                        <input
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            Login
                        </button>
                        <div className='flex justify-center flex-col m-1 p-1'>
                            <p className="text-center text-sm text-gray-500">Already have an account?
                                <NavLink to="/login" style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "" : "",
                                        color: isPending ? "red" : "blue",
                                    };
                                }}>
                                    <p>Login</p>
                                </NavLink> .</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registration
