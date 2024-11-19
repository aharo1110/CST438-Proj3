import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

function Layout() {
  const navigate = useNavigate();

  return (
    <header className="layout-header">
      <button onClick={() => navigate('/')} className="layout-button">Home</button>
      <div className="website-name">FurCare</div>
      <button onClick={() => navigate('/profile')} className="layout-button">Profile</button>
    </header>
  );
}
export default Layout;
