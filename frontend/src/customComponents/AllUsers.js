import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from './utils/config';
import Papa from 'papaparse';  // For CSV export
import jsPDF from 'jspdf';  // For PDF export
import '../customStyles/AllUsers.css';

const AllUsers = ({ handleBack }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error.message);
      });
  }, []);

  // Function to map role_id to role description
  const getRoleDescription = (roleId) => {
    switch(roleId) {
      case 1: return 'Admin';
      case 2: return 'Manager';
      case 3: return 'Sales Personnel';
      default: return 'Unknown';
    }
  };

  // Export as CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Employee Data', 10, 10); //add the title of the pdf

    const tableColumn = ["Employee ID", "Role", "First Name", "Last Name", "Username", "Password"];
    const tableRows = users.map(user => [
      user.employee_id,
      getRoleDescription(user.role_id),
      user.first_name,
      user.last_name,
      user.username,
      user.password,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('users.pdf');
  };

  return (
    <div>
      <h2>
        Employee Data
        <button onClick={handleBack} id='backButton1'>Back to Dashboard</button>
      </h2>
      <br />
      <div className="export-buttons">
        <button onClick={exportToCSV} className="btn export-csv-btn">Export as CSV</button>
        <button onClick={exportToPDF} className="btn export-pdf-btn">Export as PDF</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Role</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.employee_id}>
              <td>{user.employee_id}</td>
              <td>{getRoleDescription(user.role_id)}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
