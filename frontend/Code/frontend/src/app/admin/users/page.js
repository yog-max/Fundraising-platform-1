"use client";

import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const makeAdmin = async (userId) => {
    try {
      const response = await axios.put(`/admin/users/make-admin/${userId}`);
      toast.success(response.data.message);
      // Update the user's role in the local state after success
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: "admin" } : user
        )
      );
    } catch (err) {
      toast.error("Error making user admin");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Users List
      </h1>
      {users.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          No users found.
        </p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  {user.role === "admin" ? (
                    <button
                      className="bg-gray-400 text-white py-1 px-2 rounded"
                      disabled
                    >
                      Already Admin
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      onClick={() => makeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
