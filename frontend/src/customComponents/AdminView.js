import React from 'react';
import '../customStyles/AdminView.css';

const AdminView = ({ user, handleManageUsers, showAllUsers, handleEditProfile }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}! <button onClick={handleEditProfile} className="btn edit-profile-btn">Edit Profile</button></p>
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
