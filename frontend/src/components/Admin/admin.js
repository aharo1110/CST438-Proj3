import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import '../../css/admin.css';

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceType, setServiceType] = useState(''); // State for service type
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/home');
    }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.isAdmin !== 1) {
      navigate('/home');
    }
  }, []);

  // mocked
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users/all');
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
                  required
                />
                <textarea
                  placeholder="Service Description"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="admin-textarea"
                  required
                />
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="admin-select"
                  required
                >
                  <option value="" disabled>
                    Select Service Type
                  </option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Petsitting">Petsitting</option>
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
