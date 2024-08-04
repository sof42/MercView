import React from 'react';
import '../customStyles/AdminView.css';

const AdminView = ({ user, handleManageUsers, showAllUsers }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleManageUsers} className="btn manage-users-btn">
            <img src="/assets/AddRem.png" className="icon" />
            Add or Remove Users
          </button><br></br>
          <button onClick={showAllUsers} className="btn view-users-btn">
          <img src="/assets/allEmps.png" className="icon" />
            View All Employees
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default AdminView;
