import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../login.css';
import image from '../../images/FURCARE_logo.jpeg'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  const handleSignUp = () => {
    navigate("/signup")
  }

  return (
    <div className="App">
      <div className="logo-container">
        <img src={image} alt="FurCare Logo" className="logo-image" />
        <div className="sublogo">Welcome To</div>
        <div className="logo">FurCare</div>

      </div>
      <div className="login-card">
        <div className="tabs">
          <div className="tab active">Login</div>
          <div className="tab inactive" onClick={handleSignUp}>Sign Up</div>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="Email add. / Phone No. / Username"
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