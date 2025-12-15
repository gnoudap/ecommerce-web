import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 p-5">
      <form onSubmit={handleSubmit} className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-center text-gray-800 mb-8 text-3xl font-bold">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
        />
        <button 
          type="submit"
          className="w-full p-4 bg-purple-600 text-white rounded-full text-lg font-bold hover:bg-purple-700 hover:-translate-y-1 hover:shadow-xl transition-all"
        >
          Login
        </button>
        <p className="text-center mt-5 text-gray-600">
          Don't have an account? <Link to="/register" className="text-purple-600 font-semibold hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

