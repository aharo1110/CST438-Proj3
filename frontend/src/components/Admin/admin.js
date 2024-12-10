import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import '../../css/admin.css';

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/home');
    }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.is_admin !== 1) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/user');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/api/service', {
        name: serviceName,
        description: serviceDescription,
        service_type: serviceType,
        address: address,
        city: city,
        state: state,
        zip: zip
      }, {
        withCredentials: true
      });
      console.log('Service added:', response.data);
      setMessage(`Service "${serviceName}" added successfully as a "${serviceType}" service!`);
      setServiceName('');
      setServiceDescription('');
      setServiceType('');
      setAddress('');
      setCity('');
      setState('');
      setZip('');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className="App">
      <div className="admin-container">
        <Layout />
        <div className="main-content">
          <header className="admin-header">
            <h1>Admin Panel</h1>
          </header>
          <div className="admin-content">
            <div className="users-list">
              <h2>All Users</h2>
              <ul>
                {users.map((user, index) => (
                  <li key={index}>{user.username}</li>
                ))}
              </ul>
            </div>
            <div className="add-service-form">
              <h2>Add a New Service</h2>
              <form onSubmit={handleAddService}>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="admin-input"
                  maxLength="60"
                  required
                />
                <textarea
                  placeholder="Service Description"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="admin-textarea"
                  maxLength="255"
                  required
                />
                <div className="address-group">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="admin-input"
                    id="address"
                    maxLength="60"
                    size="30"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="admin-input"
                    maxLength="60"
                    size="18"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="admin-input"
                    maxLength="2"
                    size="3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="admin-input"
                    maxLength="10"
                    size="10"
                    required
                  />
                </div>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="admin-select"
                  required
                >
                  <option value="" disabled>
                    Select Service Type
                  </option>
                  <option value="walking">Pet Walking</option>
                  <option value="sitting">Pet Sitting</option>
                  <option value="healthcare">Pet Healthcare</option>
                </select>
                <br></br>
                <br></br>
                <button type="submit" className="admin-button">
                  Add Service
                </button>
              </form>
              {message && <p className="success-message">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
