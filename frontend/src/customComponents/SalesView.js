import React, { useState } from 'react';
import '../customStyles/EmployeeView.css';
import '../customStyles/Alerts.css';
import AlertView from './AlertView';

const SalesView = ({  user, handleEditProfile, checkCompatibility, showAllProds, editPart,
                      viewAllModels, generateReport, viewReports
}) => {
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
            Welcome, {user.firstName}!
            <button onClick={handleEditProfile} className="btn edit-profile-btn">
              (Edit Profile)
            </button>
          </p>
          <div className="button-container">
            <button onClick={showAllProds} className="btn show-prods-btn">
              <img src="/assets/allProds.png" className="icon" id="allProdsimg" alt="View All Parts" />
              View All Parts
            </button>
            <button onClick={editPart} className="btn edit-prods-btn">
              <img src="/assets/editParts.png" className="icon" alt="Edit Parts" />
              Edit Part Data
            </button>
            <button onClick={viewAllModels} className="btn view-model-btn">
              <img src="/assets/carModels.png" className="icon" alt="View all Models" />
              View All Car Models
            </button>
            <button onClick={checkCompatibility} className="btn compatibility-btn">
              <img src="/assets/compatibility.png" className="icon" alt="Check Compatibility" />
              Check Compatibility
            </button>
            <button onClick={generateReport} className="btn report-btn">
              <img src="/assets/report.png" className="icon" alt="Generate Report" id='match' />
              Generate Report
            </button>
            <button onClick={viewReports} className="btn all-report-btn">
              <img src="/assets/allReps.png" className="icon" alt="View All" id='match' />
              View All Generated Reports
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