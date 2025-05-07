import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/api';

const UserManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Danh sách người dùng</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
