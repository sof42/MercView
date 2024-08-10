import React from 'react';
import '../customStyles/EmployeeView.css';

const SalesView = ({ user, handleEditProfile, checkCompatibility }) => {
  return (
    <div>
      <h2>Sales Personnel Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!
            <button onClick={handleEditProfile} className="btn edit-profile-btn">
              (Edit Profile)
            </button>
          </p>
          <div className="button-container">
            <button onClick={checkCompatibility} className="btn compatibility-btn">
              <img src="/assets/compatibility.png" className="icon" alt="Check Compatibility" />
              Check Compatibility
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default SalesView;
