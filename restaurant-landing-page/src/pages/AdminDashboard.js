import React from 'react';

const AdminDashboard = () => {
  // Mock role-checking logic
  const userRole = localStorage.getItem('role');

  if (userRole !== 'admin') {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Manage menus, hours, and more here.</p>
    </div>
  );
};

export default AdminDashboard;
