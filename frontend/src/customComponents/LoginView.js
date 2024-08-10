import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import '../customStyles/loginView.css';
import {API_URL} from './utils/config.js';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  QGetTextFromField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  QPostLogin = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (!username || !password) {
      toast.error("Username and password fields cannot be empty.");
      return;
    }

    axios.post(API_URL + "/users/login", { username, password }, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          toast.success("Logged in successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          const roleId = res.data.roleId; // Get role id from response
          const userId = res.data.userId; // Get user id from response
          const firstName = res.data.firstName; // Get first name from response
          const lastName = res.data.lastName; // Get last name from response
          this.props.QUserFromChild({ username, roleId, userId, firstName, lastName }); // Pass them to the parent component
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 404) {
            toast.error("User not registered or incorrect credentials!");
          } else {
            toast.error("Error logging in: " + error.message);
          }
        } else {
          toast.error("Error logging in: " + error.message);
        }
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-view">
        <div className="login-container">
          <div className="card">
            <div className="card-header">
              <h2 id='title'>Login to MercView</h2>
            </div>
            <div className="card-body">
              <p className="info-message">
                This portal is restricted to authorized personnel only. You must be
                part of the company as an Inventory Manager, Administrator, or Sales
                Personnel to access this system.
              </p>
              <form onSubmit={this.QPostLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={this.QGetTextFromField}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.QGetTextFromField}
                    required
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
              </form>
            </div>
            <div className="card-footer text-muted">
              &copy; 2024 MercView
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

LoginView.propTypes = {
  QUserFromChild: PropTypes.func.isRequired,
};

export default LoginView;
