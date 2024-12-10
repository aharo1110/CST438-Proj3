import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import axios from 'axios';
import '../../browse.css';

const BrowseSer = () => {
    const [activeService, setActiveService] = useState('walking');
    const [serviceOptions, setServiceOptions] = useState({});
    const navigate = useNavigate();
  
    const services = {
      walking: {
        title: 'Pet Walking',
        icon: '🐕'
      },
      sitting: {
        title: 'Pet Sitting',
        icon: '🐱'
      },
      healthcare: {
        title: 'Pet Healthcare',
        icon: '🩺'
      }
    };
  
    const handleServiceChange = (service) => {
      setActiveService(service);
      fetchServiceDetails(service);
    };

    const fetchServiceDetails = async (service) => {
      try {
        const response = await axios.get(`http://localhost:80/api/service?type=${service}`);
        setServiceOptions(response.data);
        console.log(serviceOptions);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
  
    const handleBookService = (service) => {
      // Redirect the user to the booking page for the selected service
      navigate(`/book?service=${service}`);
    };
  
    return (
      <div className="App">
        < Layout />
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
            <div className="service-options">
              {Object.keys(serviceOptions).map((key) => {
                const option = serviceOptions[key];
                return (
                  <div key={option.service_id} className="service-option">
                    <h2>{option.name}</h2>
                    <p>{option.description}</p>
                    <p>{option.address}
                      <br />{option.city}, {option.state} {option.zip ? option.zip.substring(0, 6) : ''}
                    </p>
                    <button
                      className="book-button"
                      onClick={() => handleBookService(option.id)}
                    >
                      Book Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BrowseSer;