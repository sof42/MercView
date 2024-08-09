import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import '../customStyles/ViewAllModels.css'; // Add custom CSS for styling

const ViewAllModels = ({ handleBack }) => {
  const [carModels, setCarModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await axios.get(`${API_URL}/models`);
        setCarModels(response.data);
      } catch (error) {
        console.error("Error fetching car models:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarModels();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("All Car Models", 14, 16);

    const tableColumn = ["Car Model ID", "Car Model Name"];
    const tableRows = carModels.map(model => [
      model.car_model_id,
      model.car_model_name,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save("car_models.pdf");
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(carModels, {
      header: true,
      columns: ["car_model_id", "car_model_name"],
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'car_models.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="car-models-container">
        <h2>All Car Models</h2>
        <table className="car-models-table">
          <thead>
            <tr>
              <th>Car Model ID</th>
              <th>Car Model Name</th>
            </tr>
          </thead>
          <tbody>
            {carModels.map(model => (
              <tr key={model.car_model_id}>
                <td>{model.car_model_id}</td>
                <td>{model.car_model_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='buttonDiv'>
        <button onClick={handleBack} id="backButton">Return to Dashboard</button>
        <button onClick={exportToPDF} id="exportPDFButton">Export to PDF</button>
        <button onClick={exportToCSV} id="exportCSVButton">Export to CSV</button>
      </div>
    </div>
  );
};

export default ViewAllModels;
