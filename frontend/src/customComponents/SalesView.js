import React, { useState } from 'react';
import '../customStyles/EmployeeView.css';
import '../customStyles/Alerts.css';
import AlertView from './AlertView';

const SalesView = ({ user, handleEditProfile, checkCompatibility, showAllProds, viewAllModels }) => {
  const [showAlerts, setShowAlerts] = useState(false);

  const toggleAlerts = () => {
    setShowAlerts(prevState => !prevState);
  };

  return (
    <div className="sales-view">
      <h2>Sales Personnel Dashboard</h2>
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
            <button onClick={viewAllModels} className="btn view-model-btn">
              <img src="/assets/carModels.png" className="icon" alt="View all Models" />
              View All Car Models
            </button>
            <button onClick={checkCompatibility} className="btn compatibility-btn">
              <img src="/assets/compatibility.png" className="icon" alt="Check Compatibility" />
              Check Compatibility
            </button>
          </div>
          <button onClick={toggleAlerts} className="btn alerts-btn floating-alerts-btn">
            <img src="/assets/alert.png" className="icon" alt="Alerts" id='alertimg'/>
            Alerts
          </button>
          {showAlerts && <AlertView />}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default SalesView;
