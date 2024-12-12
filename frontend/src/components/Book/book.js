import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../browse.css';

const BrowseSer = () => {
  const [services, setServices] = useState({});
  const [activeService, setActiveService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [appointment, setAppointment] = useState({
    pet_id: '',
    service_id: '',
    appointment_date: '',
    appointment_time: ''
  });
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/service');
        const fetchedServices = response.data.reduce((acc, service) => {
          if (!acc[service.service_type]) {
            acc[service.service_type] = [];
          }
          acc[service.service_type].push(service);
          return acc;
        }, {});
        setServices(fetchedServices);
        setActiveService(Object.keys(fetchedServices)[0]); // Set the first service type as active
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchPets = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const response = await axios.get(`http://localhost:80/api/pet?owner=${userInfo.user_id}`);
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchServices();
    fetchPets();
  }, []);

  const handleServiceChange = (serviceType) => {
    setActiveService(serviceType);
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setAppointment({
      ...appointment,
      service_id: service.service_id
    });
  };

  const handleBooking = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.post('http://localhost:80/api/appointments', {
        ...appointment,
        user_id: userInfo.user_id
      });
      setMessage(`Your appointment for ${selectedService.name} has been booked!`);
      setSelectedService(null);
      setAppointment({
        pet_id: '',
        service_id: '',
        appointment_date: '',
        appointment_time: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="App">
      <div className="pet-services-container">
        <h1 className="pet-services-title">FurCare Services</h1>

        <div className="service-navigation">
          {Object.keys(services).map((serviceType) => (
            <button
              key={serviceType}
              className={`service-tab ${activeService === serviceType ? 'active' : ''}`}
              onClick={() => handleServiceChange(serviceType)}
            >
              {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
            </button>
          ))}
        </div>

        {activeService && (
          <div className="service-details">
            {services[activeService].map((service) => (
              <div key={service.service_id} className="service-info">
                <h2 className="service-title">{service.name}</h2>
                <p className="service-description">{service.description}</p>
                <p className="service-location">Location: {`${service.address}, ${service.city}, ${service.state} ${service.zip}`}</p>

                <button
                  className="book-service-btn"
                  onClick={() => handleBookService(service)}
                >
                  Book This Service
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedService && (
          <div className="booking-popup">
            <div className="popup-content">
              <h2>Book {selectedService.name}</h2>
              <div className="form-group">
                <label>Select Pet:</label>
                <select
                  className="booking-input"
                  value={appointment.pet_id}
                  onChange={(e) => setAppointment({ ...appointment, pet_id: e.target.value })}
                >
                  <option value="" disabled>Select a pet</option>
                  {pets.map((pet) => (
                    <option key={pet.pet_id} value={pet.pet_id}>{pet.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Date:</label>
                <input
                  type="date"
                  className="booking-input"
                  value={appointment.appointment_date}
                  onChange={(e) => setAppointment({ ...appointment, appointment_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Select Time:</label>
                <input
                  type="time"
                  className="booking-input"
                  value={appointment.appointment_time}
                  onChange={(e) => setAppointment({ ...appointment, appointment_time: e.target.value })}
                />
              </div>

              <button className="confirm-booking-btn" onClick={handleBooking}>Confirm Booking</button>
              <button className="close-popup-btn" onClick={() => setSelectedService(null)}>Cancel</button>
            </div>
          </div>
        )}

        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default BrowseSer;
