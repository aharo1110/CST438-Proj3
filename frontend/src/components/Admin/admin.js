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
        const response = await axios.fetch('http://localhost:80/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddService = (e) => {
    e.preventDefault();

    // replace later
    console.log('New Service:', { serviceName, serviceDescription, serviceType });
    setMessage(`Service "${serviceName}" added successfully as a "${serviceType}" service!`);
    setServiceName('');
    setServiceDescription('');
    setServiceType('');
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
                  <li key={index}>{user.name}</li>
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
                  maxlength="60"
                  required
                />
                <textarea
                  placeholder="Service Description"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="admin-textarea"
                  maxlength="255"
                  required
                />
                <div>
                  <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="admin-textarea"
                    maxlength="60"
                    size="30"
                    required
                  />
                  <input
                    placeholder="City"
                    value={address}
                    onChange={(e) => setCity(e.target.value)}
                    className="admin-textarea"
                    maxlength="60"
                    size="20"
                    required
                  />
                  <input
                    placeholder="State"
                    value={address}
                    onChange={(e) => setState(e.target.value)}
                    className="admin-textarea"
                    maxlength="2"
                    size="2"
                    required
                  />
                  <input
                    placeholder="Zip"
                    value={address}
                    onChange={(e) => setZip(e.target.value)}
                    className="admin-textarea"
                    maxlength="10"
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
                  <option value="Pet Walking">Pet Walking</option>
                  <option value="Pet Sitting">Pet Sitting</option>
                  <option value="Pet Healthcare">Pet Healthcare</option>
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
