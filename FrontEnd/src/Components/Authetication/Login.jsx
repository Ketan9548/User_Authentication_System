import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [data, setdata] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email: data.email, password: data.password })
            console.log("response value is: ", response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/homecontaints')
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Login Failed please try again...')
            }
            else {
                setErrorMessage('Network error. Please check your connection')
            }
            console.error("Error During the login in the system", error);
        }
    }

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/homecontaints');
        }
    }, []);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
                    )}
                    <form onSubmit={handleSubmit}>
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
                        <div className="flex flex-col items-center m-1 p-1">
                            <p className="text-sm text-gray-500">
                                New User?{" "}
                                <NavLink
                                    to="/login"
                                    className="text-blue-500 hover:underline"
                                    style={({ isPending }) => ({
                                        color: isPending ? "red" : "blue",
                                    })}
                                >
                                    Register here
                                </NavLink>
                            </p>
                            <a href="#" className="text-sm text-blue-500 hover:underline mt-1">
                                Forgot Password?
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
