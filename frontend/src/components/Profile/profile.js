import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import '../../css/profile.css';

function Profile() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [pets, setPets] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('userInfo')) {
          navigate('/');
        } else {
          const fetchUserInfo = async () => {
            try {
              const storedUserInfo = localStorage.getItem('userInfo');
              if (storedUserInfo) {
                const info = JSON.parse(storedUserInfo);
                setUserInfo(info);
                try {
                  const response = await axios.get(`http://localhost:80/api/pet?owner=${info.user_id}`);
                  setPets(response.data);
                } catch (error) {
                  console.error('Error fetching pets:', error);
                }
              } else {
                navigate('/');
              }
            } catch (error) {
              console.error('Error parsing userInfo:', error);
              navigate('/');
            }
          };
          fetchUserInfo();
        }
      }, [navigate]);
    
      if (!userInfo) {
        return <div>Loading...</div>;
      }

    return (
        <div className = "App">
        <div className="profile-container">
            <Layout />
            <div className="main-content">
                <header className="profile-header">
                    <h1>{userInfo.display_name}</h1>
                </header>
                <div className="main-flex">
                    <div className="sub-flex">
                        <div className="profile-details">
                            <h2>My Details</h2>
                            <div>{userInfo.email}</div>
                            <div>{userInfo.phone}</div>
                        </div>
                        <div className="profile-buttons">
                            <button className="profile-button">Add Pet</button>
                            <button className="profile-button">Edit Profile</button>
                        </div>
                        
                    </div>
                    <div className="sub-flex">
                        <div className="profile-pets">
                            <h2>My Pets</h2>
                            <div className="pet-item">
                                {pets.map((pet) => (
                                    <div key={pet.id}>
                                        <b>{pet.name}</b>
                                        <br />{pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1)} {pet.breed} {pet.type}
                                        <br />Born {new Date(pet.dob).toLocaleDateString()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        </div>
    );
}

export default Profile;