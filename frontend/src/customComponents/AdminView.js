import React from 'react';
import '../customStyles/EmployeeView.css';

const AdminView = ({ user, handleManageUsers, showAllUsers, handleEditProfile }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.firstName}!
            <button onClick={handleEditProfile} className="btn edit-profile-btn">
              Edit Profile
            </button>
          </p>
          <div className="button-container">
          <button onClick={showAllUsers} className="btn view-users-btn">
              <img src="/assets/allEmps.png" className="icon" alt="View All Employees" />
              View All Employees
            </button>
            <button onClick={handleManageUsers} className="btn manage-users-btn">
              <img src="/assets/AddRem.png" className="icon" alt="Manage Users" />
              Add or Remove Users
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default AdminView;
