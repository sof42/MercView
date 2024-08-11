import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_URL} from './utils/config';
import '../customStyles/Alerts.css';

const AlertView = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch the list of parts and their quantities
    axios.get(API_URL + '/parts')
      .then(response => {
        const parts = response.data;

        const newAlerts = parts.map(part => {
          const quantity = part.quantity;
          if (quantity < 5) {
            return { partNumber: part.part_number, alertType: 'critical' };
          } else if (quantity < 10) {
            return { partNumber: part.part_number, alertType: 'warning' };
          }
          return null;
        }).filter(alert => alert !== null);

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
