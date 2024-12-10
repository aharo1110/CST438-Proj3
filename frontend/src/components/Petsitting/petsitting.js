import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../Layout';
import '../../css/petsitting.css';

function Petsitting() {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  const { lat, lng } = location.state || {};

  useEffect(() => {
    const fetchPetsittingServices = async () => {
      try {
        const response = await fetch(`/book/petsitting?lat=${lat}&lng=${lng}`);
        if (!response.ok) {
          throw new Error('Failed to fetch petsitting services.');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (lat && lng) {
      fetchPetsittingServices();
    } else {
      setError('Location data is missing.');
    }
  }, [lat, lng]);

  return (
    <div className="App">
      <div className="petsitting-container">
        <Layout />
        <div className="main-content">
          <header className="petsitting-header">
            <h1>Petsitting Services</h1>
          </header>
          {error && <p className="error-message">{error}</p>}
          {!error && services.length > 0 ? (
            <ul className="services-list">
              {services.map((service, index) => (
                <li key={index} className="service-item">
                  <h2>{service.name}</h2>
                  <p>{service.description}</p>
                  <p>Distance: {service.distance} miles</p>
                </li>
              ))}
            </ul>
          ) : (
            !error && <p>Loading petsitting services...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Petsitting;
