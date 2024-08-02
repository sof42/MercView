import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import './loginView.css';

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

    axios.post("http://88.200.63.148:8162/users/login", { username, password }, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          toast.success("✅ Logged in successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          this.props.QUserFromChild({ username });
        } else {
          toast.error("User not registered or incorrect credentials!");
        }
      })
      .catch(error => {
        toast.error("Error logging in: " + error.message);
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-view">
        <div className="login-container">
          <div className="card">
            <div className="card-header">
              <h2>Login to MercView</h2>
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
