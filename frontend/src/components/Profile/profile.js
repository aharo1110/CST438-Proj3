import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import '../../css/profile.css';

function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [pets, setPets] = useState([]);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    type: '',
    breed: '',
    sex: '',
    dob: '',
  });

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

  const handleAddPet = async () => {
    try {
      const response = await axios.post('http://localhost:80/api/pet', {
        owner: userInfo.user_id,
        name: newPet.name,
        type: newPet.type,
        breed: newPet.breed,
        sex: newPet.sex,
        dob: newPet.dob,
      });
      setPets([...pets, response.data]);
      setShowAddPetModal(false);
      setNewPet({ name: '', type: '', breed: '', sex: '', dob: '' });
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
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
                <div>
                  {userInfo.phone
                    ? userInfo.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2-$3')
                    : ''}
                </div>
              </div>
              <div className="profile-buttons">
                <button
                  className="profile-button"
                  onClick={() => setShowAddPetModal(true)}
                >
                  Add Pet
                </button>
              </div>
            </div>
            <div className="sub-flex">
              <div className="profile-pets">
                <h2>My Pets</h2>
                <div className="pet-item">
                  {pets.map((pet) => (
                    <div key={pet.id}>
                      <b>{pet.name || 'Unnamed'}</b>
                      <br />
                      {pet.sex
                        ? `${pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1)}`
                        : 'Unknown'}{' '}
                      {pet.breed || 'Breed Unknown'} {pet.type || 'Type Unknown'}
                      <br />
                      {pet.dob
                        ? `Born ${new Date(pet.dob).toLocaleDateString()}`
                        : 'Date of Birth Unknown'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAddPetModal && (
          <div className="add-pet-modal">
            <div className="modal-content">
              <h2>Add a Pet</h2>
              <input
                type="text"
                placeholder="Pet Name"
                value={newPet.name}
                onChange={(e) =>
                  setNewPet((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Pet Type"
                value={newPet.type}
                onChange={(e) =>
                  setNewPet((prev) => ({ ...prev, type: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Breed"
                value={newPet.breed}
                onChange={(e) =>
                  setNewPet((prev) => ({ ...prev, breed: e.target.value }))
                }
              />
              <select
                value={newPet.sex}
                onChange={(e) =>
                  setNewPet((prev) => ({ ...prev, sex: e.target.value }))
                }
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="date"
                value={newPet.dob}
                onChange={(e) =>
                  setNewPet((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
              <button onClick={handleAddPet}>Add Pet</button>
              <button onClick={() => setShowAddPetModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
