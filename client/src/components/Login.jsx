import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bg from '../assets/bg4.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', values);

      if (response.data.success) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('Login failed. Check console for details.');
    }
  };

  const handleCancel = () => {
    setValues({ username: '', password: '' });
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute bottom-24 left-5 bg-[#1f4e79] text-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              required
              placeholder="Enter Username"
              className="w-full px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              className="w-full px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
