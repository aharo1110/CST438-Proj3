import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('userInfo');
    window.location.href = 'http://localhost:80/api/auth/logout';
  }

  return (
    <header className="layout-header">
      <button onClick={() => navigate('/home')} className="layout-button">Home</button>
      <div className="website-name">FurCare</div>
      <button onClick={() => navigate('/profile')} className="layout-button">Profile</button>
      <button onClick={handleLogout} className="layout-button">Logout</button>
    </header>
  );
}
export default Layout;
