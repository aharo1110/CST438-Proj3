import React, { useState } from 'react';
import Layout from '../../Layout';
import '../../css/book.css';
import image from '../../images/FURCARE_logo.jpeg';
import { useNavigate } from 'react-router-dom';

function Book() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); // State to handle the booking message
  const handleBooking = (service) => {
    setMessage(`Your appointment for ${service} has been booked`);
    // Uncomment the next line if you want to navigate somewhere after booking
    // navigate(`/book/${service.toLowerCase().replace(' ', '')}`);
  };

  return (
    <div className="App">
      <div className="book-container">
        <Layout />
        <div className="main-content">
          <div>
            <h2>
              <div className="logo-container">
                <img src={image} alt="FurCare Logo" className="logo-image" />
              </div>
            </h2>
          </div>
          <header className="book-header">
            <h1>Book a Service</h1>
          </header>
          <div className="booking-options">
            <h2>Please select a service:</h2>
            <button onClick={() => navigate('/book/petsitting')} className="booking-button">Petsitting</button>
            <button onClick={() => navigate('/book/maintenance')} className="booking-button">Maintenance Care</button>
          </div>
          {message && <p className="booking-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Book;
