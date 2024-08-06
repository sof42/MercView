import React from 'react';

const SalesView = (user, handleEditProfile) => {
  return (
    <div>
      <h2>Sales Personnel Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}! <button onClick={handleEditProfile} className="btn edit-profile-btn">(Edit Profile)</button></p>
      
      {/* Add other sales-specific content here */}
      </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default SalesView;