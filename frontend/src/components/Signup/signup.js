import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../signup.css';
import image from '../../images/FURCARE_logo.jpeg';

function Signup() {
  const navigate = useNavigate();

  // State for Pet's Details
  const [petDetails, setPetDetails] = useState({
    name: '',
    type: '',
    breed: '',
    sex: '',
    dateOfBirth: ''
  });

  // State for Owner's Details
  const [ownerDetails, setOwnerDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // State for Login Credentials
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Error states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  // Handle credentials changes
  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate Pet Details
    if (!petDetails.name) newErrors.petName = 'Pet name is required';
    if (!petDetails.type) newErrors.petType = 'Pet type is required';
    if (!petDetails.breed) newErrors.breed = 'Breed is required';
    if (!petDetails.sex) newErrors.sex = 'Sex is required';
    if (!petDetails.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    // Validate Owner Details
    if (!ownerDetails.name) newErrors.ownerName = 'Owner name is required';
    if (!ownerDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (ownerDetails.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    } else if (!/^[0-9]{10}$/.test(ownerDetails.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!ownerDetails.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(ownerDetails.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate Credentials
    if (!credentials.username) newErrors.username = 'Username is required';
    if (!credentials.password) newErrors.password = 'Password is required';
    if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        // Your API call here
        console.log('Submitting:', { petDetails, ownerDetails, credentials });
        // After successful signup
        navigate('/login');
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

  return (
    <div className="App">
      <div className="logo-container">
        <img src={image} alt="FurCare Logo" className="logo-image" />
        <div className="logo">FurCare</div>
      </div>
      <div className="signup-card">
        <div className="tabs">
          <div className="tab inactive" onClick={() => navigate('/')}>Login</div>
          <div className="tab active">Sign Up</div>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="section-title">Pet's Details</div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className={`input-field ${errors.petName ? 'error' : ''}`}
              placeholder="Pet's Name"
              value={petDetails.name}
              onChange={handlePetChange}
            />
            {errors.petName && <div className="error-message">{errors.petName}</div>}
          </div>
          <div className="form-group">
            <select
              name="type"
              className={`input-field ${errors.petType ? 'error' : ''}`}
              value={petDetails.type}
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
              name="breed"
              className={`input-field ${errors.breed ? 'error' : ''}`}
              placeholder="Breed"
              value={petDetails.breed}
              onChange={handlePetChange}
            />
            {errors.breed && <div className="error-message">{errors.breed}</div>}
          </div>
          <div className="form-group">
            <select
              name="sex"
              className={`input-field ${errors.sex ? 'error' : ''}`}
              value={petDetails.sex}
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
              name="dateOfBirth"
              className={`input-field ${errors.dateOfBirth ? 'error' : ''}`}
              value={petDetails.dateOfBirth}
              onChange={handlePetChange}
            />
            {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
          </div>

          <div className="section-title">Owner's Details</div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className={`input-field ${errors.ownerName ? 'error' : ''}`}
              placeholder="Owner's Name"
              value={ownerDetails.name}
              onChange={handleOwnerChange}
            />
            {errors.ownerName && <div className="error-message">{errors.ownerName}</div>}
          </div>
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
          <div className="form-group">
            <input
              type="email"
              name="email"
              className={`input-field ${errors.email ? 'error' : ''}`}
              placeholder="Email Address"
              value={ownerDetails.email}
              onChange={handleOwnerChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="section-title">Login Credentials</div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className={`input-field ${errors.username ? 'error' : ''}`}
              placeholder="Username"
              value={credentials.username}
              onChange={handleCredentialsChange}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Password"
              value={credentials.password}
              onChange={handleCredentialsChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Re-enter Password"
              value={credentials.confirmPassword}
              onChange={handleCredentialsChange}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
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
