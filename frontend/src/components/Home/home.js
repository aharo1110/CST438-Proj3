import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import { jwtDecode } from 'jwt-decode';
import '../../css/home.css';
import image from '../../images/FURCARE_logo.jpeg';

function Home() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');

    if (!storedUserInfo) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        console.warn('No token provided, redirecting to login.');
        navigate('/'); // Redirect to login
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.user) {
          setUserInfo(decoded.user);
          localStorage.setItem('userInfo', JSON.stringify(decoded.user));
        } else {
          console.error('Invalid token payload, redirecting to login.');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        navigate('/');
      }
    } else {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [navigate]);

  const handleDelete = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleAdd = () => {
    if (newAppointment.trim()) {
      const newId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1;
      setAppointments([...appointments, { id: newId, text: newAppointment }]);
      setNewAppointment(""); // Clear input field
    }
  };

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
            <button className="home-button" onClick={() => navigate('/profile')}>
              My Profile
            </button>
            <button className="home-button" onClick={() => navigate('/browse')}>
              Browse Services
            </button>
            <button className="home-button" onClick={() => navigate('/book')}>
              Book A Service
            </button>
            <button className="home-button" onClick={() => navigate('/health')}>
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
