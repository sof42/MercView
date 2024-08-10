import React, { useState } from 'react';
import '../customStyles/EmployeeView.css';
import AlertView from './AlertView';

const ManagerView = ({
  user, handleEditProfile, showAllProds, addRemovePart,
  editPart, viewAllModels, addRemoveModel, checkCompatibility,
  displayHistory
}) => {
  const [showAlerts, setShowAlerts] = useState(false);

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <div className="manager-view">
      <h2>Manager Dashboard</h2>
      {user ? (
        <div>
          <p>
            Welcome, {user.username}!
            <button onClick={handleEditProfile} className="btn edit-profile-btn">
              (Edit Profile)
            </button>
          </p>

          <div className="button-container">
            <button onClick={showAllProds} className="btn show-prods-btn">
              <img src="/assets/allProds.png" className="icon" id="allProdsimg" alt="View All Parts" />
              View All Parts
            </button>
            <button onClick={addRemovePart} className="btn add-remove-prods-btn">
              <img src="/assets/addRemPart.png" className="icon" alt="Add/Remove Part" />
              Add/Remove a Part
            </button>
            <button onClick={editPart} className="btn edit-prods-btn">
              <img src="/assets/editParts.png" className="icon" alt="Edit Parts" />
              Edit Part Data
            </button>
            <button onClick={viewAllModels} className="btn view-model-btn">
              <img src="/assets/carModels.png" className="icon" alt="View all Models" />
              View All Car Models
            </button>
            <button onClick={addRemoveModel} className="btn add-remove-model-btn">
              <img src="/assets/addRemMod.png" className="icon" alt="Add/Remove a Car Model" />
              Add/Remove a Car Model
            </button>
            <button onClick={checkCompatibility} className="btn compatibility-btn">
              <img src="/assets/compatibility.png" className="icon" alt="Check Compatibility" />
              Check Compatibility
            </button>
            <button onClick={displayHistory} className="btn history-btn">
              <img src="/assets/history.png" className="icon" alt="History" />
              History of Inventory Changes
            </button>
          </div>

          {showAlerts && <AlertView />}
          <button onClick={toggleAlerts} className="btn alerts-btn floating-alerts-btn">
            <img src="/assets/alert.png" className="icon" alt="Alerts" id='alertimg'/>
            Alerts
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ManagerView;
