import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../customStyles/AllUsers.css';

const AllUsers = ({handleBack}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://88.200.63.148:8162/users')
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

  return (
    <div>
      <h2>Employee Data <button onClick={handleBack} id='backButton1'> Back to Dashboard </button> </h2><br></br>
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
