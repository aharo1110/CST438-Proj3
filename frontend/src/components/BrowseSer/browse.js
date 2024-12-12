import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../browse.css';

const BrowseSer = () => {
    const [activeService, setActiveService] = useState('walking');
    const navigate = useNavigate();
    const services = {
      walking: {
        title: 'Pet Walking',
        icon: '🐕',
        description: 'Professional dog walking services',
        details: [
          'Scheduled walks',
          'Individual or group walks',
          'GPS tracking',
          'Experienced walkers'
        ],
        price: '$25 per walk'
      },
      sitting: {
        title: 'Pet Sitting',
        icon: '🐱',
        description: 'Comprehensive home pet care',
        details: [
          'In-home visits',
          'Feeding and medication',
          'Daily updates',
          'Overnight stays'
        ],
        price: '$80 per day'
      },
      healthcare: {
        title: 'Pet Healthcare',
        icon: '🩺',
        description: 'Veterinary and wellness services',
        details: [
          'Health check-ups',
          'Vaccination',
          'Emergency consultations',
          'Prescription delivery'
        ],
        price: '$150 per consultation'
      }
    };
  
    const handleServiceChange = (service) => {
      setActiveService(service);
    };
  
    const handleBookService = (service) => {
      // Redirect the user to the booking page for the selected service
      //const serviceRoute = service === 'walking' ? 'petsitting' : service;
      navigate(`/book/`);
    };
  
    return (
      <div className="App">
        <button
        className="browse-home"
        onClick={() => navigate('/home')}
      >
        Home
      </button>
        <div className="pet-services-container">
          <h1 className="pet-services-title">FurCare Services</h1>
  
          <div className="service-navigation">
            {Object.keys(services).map((serviceKey) => (
              <button
                key={serviceKey}
                className={`service-tab ${activeService === serviceKey ? 'active' : ''}`}
                onClick={() => handleServiceChange(serviceKey)}
              >
                {services[serviceKey].icon} {services[serviceKey].title}
              </button>
            ))}
          </div>
  
          <div className="service-details">
            <div className="service-info">
              <h2 className="service-title">{services[activeService].title}</h2>
              <p className="service-description">{services[activeService].description}</p>
  
              <ul className="service-features">
                {services[activeService].details.map((detail, index) => (
                  <li key={index} className="service-feature">{detail}</li>
                ))}
              </ul>
  
              <div className="service-pricing">
                <span className="price-tag">
                  Price Range: {services[activeService].price}
                </span>
              </div>
  
              <button
                className="book-service-btn"
                onClick={() => handleBookService(activeService)}
              >
                Book {services[activeService].title} Service
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BrowseSer;