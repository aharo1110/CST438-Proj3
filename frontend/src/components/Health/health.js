import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../health.css';

function Health() {
  const navigate = useNavigate();

  const [petDetails, setPetDetails] = useState({
    lastVisitedDay: '',
    nextVisit: '',
    lastWeightCheck: '',
    totalOperations: '',
    doctorName: '',
    phone: '',
  });

  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ date: '', type: '' });
  const [showAddVaccinationForm, setShowAddVaccinationForm] = useState(false);

  const [foodAllergies, setFoodAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState('');
  const [showAddAllergyForm, setShowAddAllergyForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow numeric input for the phone field
      if (!isNaN(value) || value === '') {
        setPetDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      }
    } else {
      setPetDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleNumericInputChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setPetDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleAddRecord = () => {
    if (newRecord.date && newRecord.type) {
      setVaccinationRecords([...vaccinationRecords, newRecord]);
      setNewRecord({ date: '', type: '' });
      setShowAddVaccinationForm(false);
    }
  };

  const handleDeleteRecord = (index) => {
    setVaccinationRecords((prevRecords) =>
      prevRecords.filter((_, i) => i !== index)
    );
  };

  const handleAddAllergy = () => {
    if (newAllergy) {
      setFoodAllergies([...foodAllergies, newAllergy]);
      setNewAllergy('');
      setShowAddAllergyForm(false);
    }
  };

  const handleDeleteAllergy = (index) => {
    setFoodAllergies((prevAllergies) =>
      prevAllergies.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="App">
      <button
          className="health-home"
          onClick={() => navigate('/home')} // Navigate to the home page
        >
          Home
        </button>
      
      <div className="header">
        <div className="contact-info">
          <input
            type="text"
            name="doctorName"
            value={petDetails.doctorName}
            onChange={handleInputChange}
            placeholder="Doctor's Name"
          />
          <input
            type="tel"
            name="phone"
            value={petDetails.phone}
            onChange={handleInputChange}
            placeholder="Doctor's Number"
          />
        </div>
      </div>

      <div className="content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Centered Pet Information */}
        <div className="section" style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
          <h2>Pet Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-label">Last Vet Visit</div>
              <div className="info-value">
                <span className="icon">📅</span>
                <input
                  type="date"
                  name="lastVisitedDay"
                  value={petDetails.lastVisitedDay}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">Next Vet Visit</div>
              <div className="info-value">
                <span className="icon">📅</span>
                <input
                  type="date"
                  name="nextVisit"
                  value={petDetails.nextVisit}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">Last weight check</div>
              <div className="info-value">
                <span className="icon">⚖️</span>
                <input
                  type="text"
                  name="lastWeightCheck"
                  value={petDetails.lastWeightCheck}
                  onChange={handleNumericInputChange}
                  placeholder="Enter weight"
                />
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">Total operations done</div>
              <div className="info-value">
                <span className="icon">💉</span>
                <input
                  type="text"
                  name="totalOperations"
                  value={petDetails.totalOperations}
                  onChange={handleNumericInputChange}
                  placeholder="Enter total operations"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Side by Side Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Vaccination Records */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Vaccination Records</h2>
              <button className="add-button" onClick={() => setShowAddVaccinationForm(!showAddVaccinationForm)}>+</button>
            </div>
            {showAddVaccinationForm && (
              <div className="add-record-form">
                <input
                  type="text"
                  placeholder="Vaccination Type"
                  value={newRecord.type}
                  onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                />
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                />
                <button onClick={handleAddRecord}>Add Record</button>
              </div>
            )}
            <div className="vaccination-list">
              {vaccinationRecords.map((record, index) => (
                <div className="vaccination-item" key={index}>
                  <span className="icon icon-vaccine">💉</span>
                  <span>{record.type}</span>
                  <span className="vaccination-date">Date: {record.date}</span>
                  <button className="delete-button" onClick={() => handleDeleteRecord(index)}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          {/* Food Allergies */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Food Allergies</h2>
              <button className="add-button" onClick={() => setShowAddAllergyForm(!showAddAllergyForm)}>+</button>
            </div>
            {showAddAllergyForm && (
              <div className="add-allergy-form">
                <input
                  type="text"
                  placeholder="Enter Allergy"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                />
                <button onClick={handleAddAllergy}>Add Allergy</button>
              </div>
            )}
            <div className="allergy-list">
              {foodAllergies.map((allergy, index) => (
                <div className="allergy-item" key={index}>
                  <span className="icon icon-cross">❌</span>
                  <span>{allergy}</span>
                  <button className="delete-button" onClick={() => handleDeleteAllergy(index)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Health;