import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import '../../css/location.css';

function Location() {
  const [userLocation, setUserLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      // geocoding api
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          userLocation
        )}&key=AIzaSyAKzZyhmMHqkHULld-rFM8JEZ_521J84ac`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;

        console.log('Geocoded Location:', { lat, lng });
        navigate('/book', { state: { lat, lng, userLocation } }); // pass location data
      } else {
        setError('Could not find the location. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="location-container">
        <Layout />
        <div className="main-content">
          <header className="location-header">
            <h1>Enter Your Address</h1>
          </header>
          <form onSubmit={handleLocationSubmit} className="location-form">
            <input
              type="text"
              placeholder="Enter city OR zip code"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="location-input"
              required
            />
            <button type="submit" className="location-button">
              Submit
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Location;
