import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../customStyles/Alerts.css';

const AlertView = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch the list of parts and their quantities
    axios.get('http://88.200.63.148:8162/parts')
      .then(response => {
        const parts = response.data;
        console.log("Fetched parts:", parts); // Debug log

        const newAlerts = parts.map(part => {
          const quantity = part.quantity;
          if (quantity < 5) {
            return { partNumber: part.part_number, alertType: 'critical' };
          } else if (quantity < 10) {
            return { partNumber: part.part_number, alertType: 'warning' };
          }
          return null;
        }).filter(alert => alert !== null);

        console.log("Processed alerts:", newAlerts); // Debug log
        setAlerts(newAlerts);
      })
      .catch(error => {
        console.error("Error fetching parts:", error.message);
      });
  }, []);

  return (
    <div className="alerts-container">
      {alerts.length === 0 ? (
        <p>No low stock alerts</p>
      ) : (
        alerts.map((alert, index) => (
          <p key={index} className={`alert ${alert.alertType}`}>
            Alert: Car part with part number: {alert.partNumber} is {alert.alertType === 'critical' ? 'critically low' : 'low'} on stock.
          </p>
        ))
      )}
    </div>
  );
};

export default AlertView;
