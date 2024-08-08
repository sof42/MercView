import React from 'react';
import '../customStyles/EmployeeView.css';

const ManagerView = ({ user, handleEditProfile, showAllProds, addRemovePart }) => {
  return (
    <div>
      <h2>Manager Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}! <button onClick={handleEditProfile} className="btn edit-profile-btn">(Edit Profile)</button></p>
          <button onClick={showAllProds} className="btn show-prods-btn">
            <img src="/assets/allProds.png" className="icon" id='allProdsimg' />
            View All Parts
          </button><br></br>
          <button onClick={addRemovePart} className="btn show-prods-btn">
            <img src="/assets/addRemPart.png" className="icon" />
            Add/Remove a Part
          </button><br></br>
      </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ManagerView;