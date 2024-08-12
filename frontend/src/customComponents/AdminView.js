import React from 'react';
import '../customStyles/EmployeeView.css';

const AdminView = ({  user, handleManageUsers, showAllUsers, handleEditProfile, displayHistory,
                      viewReports, viewAllModels, showAllProds
}) => {
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
            <button onClick={displayHistory} className="btn history-btn">
              <img src="/assets/history.png" className="icon" alt="History" />
              History of Inventory Changes
            </button>
            <button onClick={viewReports} className="btn report-btn">
              <img src="/assets/allReps.png" className="icon" alt="View All" id='match' />
              View All Generated Reports
            </button>
            <button onClick={showAllProds} className="btn show-prods-btn">
              <img src="/assets/allProds.png" className="icon" id="allProdsimg" alt="View All Parts" />
              View All Parts
            </button>
            <button onClick={viewAllModels} className="btn view-model-btn">
              <img src="/assets/carModels.png" className="icon" alt="View all Models" />
              View All Car Models
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