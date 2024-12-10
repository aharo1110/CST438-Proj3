import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../login.css';
import image from '../../images/FURCARE_logo.jpeg'

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/home');
    }
  }, [navigate]);

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