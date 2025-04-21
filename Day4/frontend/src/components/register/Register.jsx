import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    
    if (!formData.name.trim() || !formData.age) {
      setStatus({
        message: "Name and age are required",
        type: "error"
      });
      return;
    }

    if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setStatus({
        message: "Please enter a valid age",
        type: "error"
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: "", type: "" });
      
      const newUser = { name: formData.name.trim(), age: parseInt(formData.age) };
      const response = await axios.post('http://localhost:7001/users', newUser);
      
      setStatus({
        message: "User registered successfully!",
        type: "success"
      });
      
      // Reset form after successful registration
      setFormData({ name: "", age: "" });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setStatus({
        message: error.response?.data?.message || "User registration failed",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Register New User</h1>
        <p className="text-gray-600">Add a new user to the system</p>
      </div>
      
      <div className="max-w-md mx-auto">
        {status.message && (
          <div 
            className={`mb-4 p-4 rounded-lg ${
              status.type === "success" 
                ? "bg-green-100 border border-green-400 text-green-700" 
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="user-name">
              Name
            </label>
            <input 
              type="text" 
              id="user-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="user-age">
              Age
            </label>
            <input 
              type="number"
              id="user-age" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user age"
            />
          </div>
          
          <div className="mt-6">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-2 px-4 rounded-lg text-white transition-colors duration-200 ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register User"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
            View All Users
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;