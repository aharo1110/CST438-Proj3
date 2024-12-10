import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout'
import { jwtDecode } from 'jwt-decode';
import '../../css/home.css';
import image from '../../images/FURCARE_logo.jpeg';

function Home() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    service_id: '',
    pet_id: '',
    appointment_date: '',
    appointment_time: '',
  });
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

  // Fetch appointments on component load
  useEffect(() => {
    if (userInfo) {
      fetch(`/api/appointment?user_id=${userInfo.user_id}`)
        .then((response) => response.json())
        .then((data) => {
          setAppointments(data);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [userInfo]);

 // Handler for deleting an appointment
 const handleDelete = (id) => {
  fetch(`/api/appointment?id=${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        setAppointments(appointments.filter((appointment) => appointment.appointment_id !== id));
      }
    })
    .catch((error) => console.error("Error deleting appointment:", error));
};

const handleAdd = () => {
  if (Object.values(newAppointment).every((field) => field.trim())) {
    fetch('/api/appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newAppointment,
        user_id: userInfo.user_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments([...appointments, data]);
        setNewAppointment({
          service_id: '',
          pet_id: '',
          appointment_date: '',
          appointment_time: '',
        });
      })
      .catch((error) => console.error("Error adding appointment:", error));
  } else {
    alert('Please fill all fields.');
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
          <div className="logo-container">
            <img src={image} alt="FurCare Logo" className="logo-image" />
          </div>

          <div className="home-buttons">
            <button className="home-button"
            onClick={() => navigate('/profile')}>My Profile</button>
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

          {/* Appointment Form */}
          <div className="appointment-form">
            <input
              type="text"
              placeholder="Service ID"
              value={newAppointment.service_id}
              onChange={(e) => setNewAppointment({ ...newAppointment, service_id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Pet ID"
              value={newAppointment.pet_id}
              onChange={(e) => setNewAppointment({ ...newAppointment, pet_id: e.target.value })}
            />
            <input
              type="date"
              value={newAppointment.appointment_date}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
            />
            <input
              type="time"
              value={newAppointment.appointment_time}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointment_time: e.target.value })}
            />
            <button onClick={handleAdd}>Add Appointment</button>
          </div>

          {/* Display Appointments */}
          <div className="appointments-list">
            <h2>Your Appointments</h2>
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment.appointment_id}>
                    <div>
                      <p>Service ID: {appointment.service_id}</p>
                      <p>Pet ID: {appointment.pet_id}</p>
                      <p>Date: {appointment.appointment_date}</p>
                      <p>Time: {appointment.appointment_time}</p>
                      <button onClick={() => handleDelete(appointment.appointment_id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;