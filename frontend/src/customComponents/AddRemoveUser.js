import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../customStyles/AddRemoveUser.css';
import {API_URL} from './utils/config';

const AddRemoveUser = ({handleBack}) => {
  const [newUser, setNewUser] = useState({
    roleId: 1,
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  const [users, setUsers] = useState([]);
  const [userIdToRemove, setUserIdToRemove] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      roleId: parseInt(e.target.value, 10),
    }));
  };

  const handleAddUser = () => {
    const { roleId, firstName, lastName, username, password } = newUser;

    if (![1, 2, 3].includes(roleId)) {
      toast.error('Role ID must be 1, 2, or 3.');
      return;
    }

    if (!username || !firstName || !lastName || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    axios.post(API_URL + '/users/add', {
      role_id: roleId,
      first_name: firstName,
      last_name: lastName,
      username,
      password
    })
      .then(response => {
        if (response.status === 201) {
          toast.success('User added successfully!');
          setNewUser({
            roleId: 1,
            firstName: '',
            lastName: '',
            username: '',
            password: ''
          });
          fetchUsers();
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || 'Failed to add user.';
          toast.error(errorMessage);
        } else {
          console.error("Error adding user:", error.message);
          toast.error('Failed to add user.');
        }
      });
  };

  const handleRemoveUser = async () => {
    try {
      const response = await axios.delete(API_URL + `/users/remove/${userIdToRemove}`);

      if (response.status === 200) {
        toast.success('User removed successfully!');
        setUserIdToRemove('');
        await fetchUsers();
      } else if (response.status === 404) {
        toast.error('User not found. Incorrect employee ID.');
      } else {
        toast.error('Unexpected response status.');
      }
    } catch (error) {
      console.error('Error removing user:', error.message);
      toast.error('Failed to remove user.');
    }
  };

  const fetchUsers = () => {
    axios.get(API_URL + '/users')
      .then(response => {
        setUsers(response.data.users || []);
      })
      .catch(error => {
        console.error("Error fetching users:", error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div id="add-remove-user-container">
        <div id="add-user-card" className="card">
          <h2>Add User</h2>
          <select
            id="role-select"
            name="roleId"
            value={newUser.roleId}
            onChange={handleRoleChange}
            className="input-field"
          >
            <option value={1}>Admin</option>
            <option value={2}>Manager</option>
            <option value={3}>Sales Personnel</option>
          </select>
          <input
            id="first-name-input"
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="input-field"
          />
          <input
            id="last-name-input"
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="input-field"
          />
          <input
            id="username-input"
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="input-field"
          />
          <input
            id="password-input"
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="input-field"
          />
          <button id="add-user-button" onClick={handleAddUser} className="button">Add User</button>
        </div>

        <div id="remove-user-card" className="card">
          <h2>Remove User</h2>
          <input
            id="remove-user-id-input"
            type="text"
            value={userIdToRemove}
            onChange={(e) => setUserIdToRemove(e.target.value)}
            placeholder="User ID to Remove"
            className="input-field"
          />
          <button id="remove-user-button" onClick={handleRemoveUser} className="button">Remove User</button>
        </div>

        <ToastContainer />
        </div><br></br>
        <div id='buttonDiv'>
          <button onClick={handleBack} id = "backButton">Return to Dashboard</button>
        </div>
    </div>
  );
};

export default AddRemoveUser;
