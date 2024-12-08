import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../login.css';
import image from '../../images/FURCARE_logo.jpeg'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });

  try {
    const response = await axios.post('http://localhost:80/api/login', {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      
      localStorage.setItem('authToken', response.data.token);
      navigate('/home');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Invalid username or password');
  }
};

  const handleSignUp = () => {
    navigate("/signup")
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img src={image} alt="FurCare Logo" className="logo-image" />
        <div className="sublogo">Welcome To</div>
        <div className="logo">FurCare</div>

      </div>
      <div className="login-card">
        <div className="google-login">
          <a href="http://localhost:80/api/auth/google">
            <button className="login-button">
              Sign in with Google
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
//JB: probably create oath2 properties here, in a later time.
export default Login;