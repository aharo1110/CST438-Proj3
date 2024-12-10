import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../signup.css';
import image from '../../images/FURCARE_logo.jpeg';

function Signup() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(null);

  // Error states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewUser = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (!token) {
      setErrors({ submit: 'Token is missing' });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:80/api/auth/signup?token=${token}`);
      setNewUser({ id: response.data.id, name: response.data.displayName });
    } catch (error) {
      console.error('Error fetching new user data:', error);
      setErrors({ submit: 'Invalid token' });
    }
  };

  useEffect(() => {
    fetchNewUser();
  }, []);

  // State for Pet's Details
  const [petDetails, setPetDetails] = useState({
    pet_name: '',
    pet_type: '',
    pet_breed: '',
    pet_sex: '',
    pet_dob: ''
  });

  // State for Owner's Details
  const [ownerDetails, setOwnerDetails] = useState({
      google_id: newUser ? newUser.id : '',
      phone: '',
  });

  // Handle pet details changes
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle owner details changes
  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setOwnerDetails(prev => ({
        ...prev,
        [name]: numbersOnly
      }));
    } else {
      // Handle other owner details normally
      setOwnerDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate Pet Details
    if (!petDetails.pet_name) newErrors.petName = 'Pet name is required';
    if (!petDetails.pet_name) newErrors.petType = 'Pet type is required';
    if (!petDetails.pet_breed) newErrors.breed = 'Breed is required';
    if (!petDetails.pet_sex) newErrors.sex = 'Sex is required';
    if (!petDetails.pet_dob) newErrors.dateOfBirth = 'Date of birth is required';

    // Validate Owner Details
    if (!ownerDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (ownerDetails.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    } else if (!/^[0-9]{10}$/.test(ownerDetails.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:80/api/auth/signup', {
          google_id: newUser.id,
          phone: ownerDetails.phone,
          pet_name: petDetails.pet_name,
          pet_type: petDetails.pet_type,
          pet_breed: petDetails.pet_breed,
          pet_sex: petDetails.pet_sex,
          pet_dob: petDetails.pet_dob
        });
        
        navigate(`/home?token=${response.data.token}`);
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ submit: 'Failed to create account. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  if(!newUser){
    return <div><h1>Not a new user</h1></div>;
  }

  return (
    <div className="App">
      <div className="logo-container">
        <img src={image} alt="FurCare Logo" className="logo-image" />
        <div className="logo">FurCare</div>
      </div>
      <div className="signup-card">
        <h1>Welcome, {newUser.name}</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="section-title">Pet's Details</div>
          <div className="form-group">
            <input
              type="text"
              name="pet_name"
              className={`input-field ${errors.petName ? 'error' : ''}`}
              placeholder="Pet's Name"
              value={petDetails.pet_name}
              onChange={handlePetChange}
            />
            {errors.petName && <div className="error-message">{errors.petName}</div>}
          </div>
          <div className="form-group">
            <select
              name="pet_type"
              className={`input-field ${errors.petType ? 'error' : ''}`}
              value={petDetails.pet_type}
              onChange={handlePetChange}
            >
              <option value="">Select Pet Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>
            {errors.petType && <div className="error-message">{errors.petType}</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="pet_breed"
              className={`input-field ${errors.breed ? 'error' : ''}`}
              placeholder="Breed"
              value={petDetails.pet_breed}
              onChange={handlePetChange}
            />
            {errors.breed && <div className="error-message">{errors.breed}</div>}
          </div>
          <div className="form-group">
            <select
              name="pet_sex"
              className={`input-field ${errors.sex ? 'error' : ''}`}
              value={petDetails.pet_sex}
              onChange={handlePetChange}
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && <div className="error-message">{errors.sex}</div>}
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Date of birth"
              name="pet_dob"
              className={`input-field ${errors.dateOfBirth ? 'error' : ''}`}
              value={petDetails.pet_dob}
              onChange={handlePetChange}
            />
            {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
          </div>

          <div className="section-title">Owner's Details</div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              className={`input-field ${errors.phone ? 'error' : ''}`}
              placeholder="Phone Number"
              value={ownerDetails.phone}
              onChange={handleOwnerChange}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <button 
            type="submit" 
            className={`signup-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}


export default Signup;