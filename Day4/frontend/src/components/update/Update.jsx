import React, { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: ""
  });

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Filter users for ID field suggestions
    if (name === "id") {
      const filtered = users.filter(user => 
        user.id.toString().includes(value) || 
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowSuggestions(value.length > 0 && filtered.length > 0);
    }
  };

  const handleSelectUser = (user) => {
    setFormData({
      id: user.id.toString(),
      name: user.name,
      age: user.age.toString()
    });
    setShowSuggestions(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, name, age } = formData;
    
    if (!id || !name || !age) {
      setStatus({
        message: "All fields are required",
        type: "error"
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: "", type: "" });
      
      const userData = { name, age: parseInt(age) };
      await axios.put(`http://localhost:7001/users/${id}`, userData);
      
      setStatus({
        message: "User updated successfully",
        type: "success"
      });
      
      // Reset form
      setFormData({ id: "", name: "", age: "" });
    } catch (error) {
      console.error("Error updating user:", error);
      setStatus({
        message: error.response?.data?.message || "Failed to update user",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update User</h1>
        <p className="text-gray-600">Modify existing user information</p>
      </div>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {status.message && (
          <div className={`mb-4 p-3 rounded ${
            status.type === "success" 
              ? "bg-green-100 text-green-700 border border-green-400" 
              : "bg-red-100 text-red-700 border border-red-400"
          }`}>
            {status.message}
          </div>
        )}
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2 relative">
            <label className="block text-gray-700 font-medium" htmlFor="user-id">
              User ID or Name
            </label>
            <input
              type="text"
              name="id"
              id="user-id"
              value={formData.id}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(formData.id.length > 0 && filteredUsers.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID or start typing a name"
            />
            
            {showSuggestions && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">ID: {user.id} • Age: {user.age}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="user-name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="user-name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="user-age">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="user-age"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new age"
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
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
                  Updating...
                </span>
              ) : (
                "Update User"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Back to User List
          </a>
        </div>
      </div>
    </div>
  );
};

export default Update;