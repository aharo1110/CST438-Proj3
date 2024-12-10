import React, { useState } from 'react';
import Layout from '../../Layout';
import { useNavigate } from 'react-router-dom';

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
            <button
              onClick={() => handleBooking('Pet Walking')}
              className="booking-button"
            >
              Pet Walking
            </button>
            <button
              onClick={() => handleBooking('Pet Sitting')}
              className="booking-button"
            >
              Pet Sitting
            </button>
            <button
              onClick={() => handleBooking('Pet Healthcare')}
              className="booking-button"
            >
              Pet Healthcare
            </button>
          {message && <p className="booking-message">{message}</p>}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Book;
