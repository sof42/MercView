import React from 'react';
import '../customStyles/AdminView.css';

const AdminView = ({ user, handleManageUsers }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          {/* Button to navigate to Add/Remove User view */}
          <button onClick={handleManageUsers} className="btn manage-users-btn">
            <img src="/assets/AddRem.png" alt="Manage Users" className="icon" />
            Add or Remove Users
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default AdminView;
