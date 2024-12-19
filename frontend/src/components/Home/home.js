import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import '../../css/home.css';
import axios from 'axios';
import image from '../../images/FURCARE_logo.jpeg';
function Home() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (!token) {
        navigate('/');
        return;
      }
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserInfo(decoded.user);
      localStorage.setItem('userInfo', JSON.stringify(decoded.user));
    } else {
      const info = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(info);
    }
  }, [navigate]);
  useEffect(() => {
    const fetchAppointments = async () => {
      if (userInfo) {
        try {
          const response = await axios.get(`http://localhost:80/api/appointments?user_id=${userInfo.user_id}`);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    };
    fetchAppointments();
  }, [userInfo]);
  return (
    <div className="App">
      <div className="home-container">
        <Layout />
        <div className="main-content">
          <header className="home-header">
            <h1>Welcome to FurCare</h1>
          </header>
          <div className="logo-container">
            <img src={image} alt="FurCare Logo" className="logo-image" />
          </div>
          <div className="home-buttons">
            <button className="home-button" onClick={() => navigate('/profile')}>My Profile</button>
            <button className="home-button" onClick={() => navigate('/browse')}>Browse/Book Services</button>
            <button className="home-button" onClick={() => navigate('/health')}>Record Pet Health</button>
          </div>
          <section className="appointments-section">
            <h2>Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <p>No upcoming appointments.</p>
            ) : (
              <ul className="appointments-list">
                {appointments.map((appointment) => (
                  <li key={appointment.appointment_id} className="appointment-item">
                    <div className="appointment-info">
                      <span className="pet-name">Pet: {appointment.pet_name}</span>
                      <br></br>
                      <span className="service-name">Service: {appointment.service_name}</span>
                    </div>
                    <div className="appointment-date-time">
                      <span className="appointment-date">Date: {new Date(appointment.appointment_date).toLocaleDateString()}</span>
                      <br></br>
                      <span className="appointment-time">Time: {appointment.appointment_time.slice(0, 5)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
export default Home;