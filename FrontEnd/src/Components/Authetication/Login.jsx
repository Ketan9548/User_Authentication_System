import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email: data.email, password: data.password });
            localStorage.setItem('token', response.data.token);
            navigate('/homecontaints');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login Failed. Please try again...');
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/homecontaints');
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                    <div className="text-center text-sm text-gray-500">
                        <p>
                            New User?{' '}
                            <NavLink to="/register" className="text-blue-500 hover:underline">
                                Register here
                            </NavLink>
                        </p>
                        <NavLink to="/forgot-password" className="text-blue-500 hover:underline mt-2 block">
                            Forgot Password?
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;