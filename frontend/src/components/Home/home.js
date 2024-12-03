import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout'
import '../../css/home.css';
import image from '../../images/FURCARE_logo.jpeg';


function Home() {
  const navigate = useNavigate();

  return (
    <div className = "App">
    <div className="home-container">
      <Layout />

      <div className="main-content">
        <header className="home-header">
          <h1>Welcome to FurCare</h1>
        </header>

        <div className="home-buttons">
          <button onClick={() => navigate('/pets')} className="home-button">My Pets</button>
          <button onClick={() => navigate('/services')} className="home-button">Browse Services</button>
          <button onClick={() => navigate('/book')} className="home-button">Book A Service</button>
        </div>

        <section className="appointments-section">
          <h2>Upcoming Appointments</h2>
          <ul className="appointments-list">
            {/* TODO */}
            <li>Appointment 1: 10/25/2024 - 2:00 PM</li>
            <li>Appointment 2: 10/30/2024 - 10:00 AM</li>
            <li>Appointment 3: 11/05/2024 - 11:00 AM</li>
          </ul>
        </section>
      </div>
    </div>
    </div>
  );
}

export default Home;
