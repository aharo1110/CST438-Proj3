import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img src="/Users/saniyawairkar/Desktop/SEProject3/CST438-Proj3/frontend/src/images/FURCARE_logo.jpeg" alt="FurCare Logo" className="logo-image" />
        <div className="logo">FurCare</div>
      </div>
      <div className="login-card">
        <div className="tabs">
          <div className="tab active">Login</div>
          <div className="tab inactive">Sign Up</div>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="Email address / Phone No. / Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="forgot-password">Forget Password?</a>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;