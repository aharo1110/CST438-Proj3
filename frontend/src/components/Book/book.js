import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import '../../css/book.css';
import axios from 'axios';
import image from '../../images/FURCARE_logo.jpeg';
import { useNavigate } from 'react-router-dom';

function Book() {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const [message, setMessage] = useState(''); // State to handle the booking message
  const handleBooking = (service) => {
    setMessage(`Your appointment for ${service} has been booked`);
    // Uncomment the next line if you want to navigate somewhere after booking
    // navigate(`/book/${service.toLowerCase().replace(' ', '')}`);
=======
  const [message, setMessage] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const service_id = urlParams.get('service_id');

  const [pets, setPets] = useState([]);
  const [service, setService] = useState(null);

  const [appointment, setAppointment] = useState({
    pet_id: '',
    service_id: service_id,
    appointment_date: '',
    appointment_time: ''
  });

  useEffect(() => {
    if(!service_id) {
      navigate('/browse');
    }
  }, [service_id, navigate]);

  const fetchService = async (service_id) => {
    try {
      const response = await axios.get(`http://localhost:80/api/service?id=${service_id}`);
      setService(response.data);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  }

  const fetchPets = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.get(`http://localhost:80/api/pet?owner=${userInfo.user_id}`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  }

  useEffect(() => {
    fetchService(service_id);
  }, [service_id]);

  const handleBooking = async (service) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.post('http://localhost:80/api/appointment', {
      ...appointment,
      user_id: userInfo.user_id
    });
    setMessage(`Your appointment for ${service.name} has been booked`);
    navigate('/home');
>>>>>>> Stashed changes
  };

  return (
    <div className="App">
      <div className="book-container">
        <Layout />
        <div className="main-content">
          <header className="book-header">
            <h1>Book {service.name}</h1>
          </header>
          <div className="booking-options">
<<<<<<< Updated upstream
            <h2>Please select a service:</h2>
            <button onClick={() => navigate('/book/petsitting')} className="booking-button">Petsitting</button>
            <button onClick={() => navigate('/book/maintenance')} className="booking-button">Maintenance Care</button>
=======
            <h2>Please select a date:</h2>
            <input type="date" className="booking-input" 
              value={appointment.date}
              onChange={(e) => setAppointment({ ...appointment, appointment_date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
            <h2>Please select a time:</h2>
            <input type="time" className="booking-input" 
              value={appointment.time}
              onChange={(e) => setAppointment({ ...appointment, appointment_time: e.target.value })}
              
            />
            <h2>Please select a pet:</h2>
            <select className="booking-input"
              onChange={(e) => setAppointment({ ...appointment, pet_id: e.target.value })}
            >
              {pets.map((pet) => (
                <option key={pet.pet_id} value={pet.pet_id}>{pet.pet_name}</option>
              ))}
            </select>
            <button onClick={handleBooking} className="booking-button">Petsitting</button>
            
>>>>>>> Stashed changes
          </div>
          {message && <p className="booking-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Book;
