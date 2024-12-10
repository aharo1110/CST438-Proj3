import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout'
import { jwtDecode } from 'jwt-decode';
import '../../css/home.css';
import image from '../../images/FURCARE_logo.jpeg';

function Home() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if(!localStorage.getItem('userInfo')) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (!token) {
        navigate('/');
      }

      const decoded = jwtDecode(token);
      setUserInfo(decoded.user);
      localStorage.setItem('userInfo', JSON.stringify(decoded.user));
    } else {
      const info = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(info);
    }
  }, [navigate]);

  // Handler for deleting an appointment
  const handleDelete = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  // Handler for adding a new appointment
  const handleAdd = () => {
    if (newAppointment.trim()) {
      const newId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1;
      setAppointments([...appointments, { id: newId, text: newAppointment }]);
      setNewAppointment(""); // Clear input field
    }
  };
  
  return (
    <div className = "App">
    <div className="home-container">
      <Layout />

      <div className="main-content">
        <header className="home-header">
          <h1>Welcome to FurCare</h1>
        </header>

        <div className="home-buttons">
          <button onClick={() => navigate('/health')} className="home-button">My Pets</button>
          <button onClick={() => navigate('/services')} className="home-button">Browse Services</button>
          <button onClick={() => navigate('/location')} className="home-button">Book A Service</button>
        </div>

        <div className="main-content">
          <header className="home-header">
            <h1>Welcome to FurCare</h1>
          </header>
          <div className="logo-container">
            <img src={image} alt="FurCare Logo" className="logo-image" />
          </div>

          <div className="home-buttons">
            <button className="home-button">My Pets</button>
            <button 
              className="home-button" 
              onClick={() => navigate('/browse')} // Redirect to Browse page
            >
              Browse Services
            </button>
            <button 
              className="home-button" 
              onClick={() => navigate('/book')} // Redirect to Book page
            >
              Book A Service
            </button>
            <button 
              className="home-button" 
              onClick={() => navigate('/health')} // Redirect to Health page
            >
              Record Pet Health
            </button>
          </div>

          <section className="appointments-section">
            <h2>Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <p>No upcoming appointments. Add one below!</p>
            ) : (
              <ul className="appointments-list">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="appointment-item">
                    <span>{appointment.text}</span>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="add-appointment">
              <input
                type="text"
                value={newAppointment}
                onChange={(e) => setNewAppointment(e.target.value)}
                placeholder="Add new appointment (e.g., Vet - 11/10/2024 - 3:00 PM)"
                className="appointment-input"
              />
              <button onClick={handleAdd} className="add-button">
                Add Appointment
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
