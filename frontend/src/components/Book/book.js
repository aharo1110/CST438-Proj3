import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import '../../css/book.css';

function Book() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="book-container">
        <Layout />
        <div className="main-content">
          <header className="book-header">
            <h1>Book a Service</h1>
          </header>
          <div className="booking-options">
            <h2>Please select a service:</h2>
            <button onClick={() => navigate('/petsitting')} className="booking-button">
              Petsitting
            </button>
            <button onClick={() => navigate('/maintenance')} className="booking-button">
              Maintenance Care
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
