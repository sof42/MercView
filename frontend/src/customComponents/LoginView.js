import React, { useState } from 'react';
import './loginView.css';

function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { username, password });
  };

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
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}

export default LoginView;
