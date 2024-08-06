import React from 'react';
import '../customStyles/AdminView.css';

const ManagerView = ({ user, handleEditProfile }) => {
  return (
    <div>
      <h2>Manager Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}! <button onClick={handleEditProfile} className="btn edit-profile-btn">(Edit Profile)</button></p>
      
      {/* Add other Manager-specific content here */}
      </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ManagerView;