import React, { useState } from 'react';
import { authService } from '../services/authService';
import { FaUser, FaEnvelope, FaPhone, FaHistory, FaEdit } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const currentUser = authService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user info
    setIsEditing(false);
    // Add API call to update user info
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Mock order history data
  const orderHistory = [
    { id: 1, date: '2024-01-15', total: 45.99, status: 'Delivered' },
    { id: 2, date: '2024-01-10', total: 32.50, status: 'Delivered' },
    { id: 3, date: '2024-01-05', total: 28.75, status: 'Delivered' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          {!isEditing && (
            <button className="edit-button" onClick={handleEdit}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-section personal-info">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div className="info-content">
                  <label>Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={userInfo.username}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{userInfo.username}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-content">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{userInfo.email}</p>
                  )}
                </div>
              </div>

            </div>

            {isEditing && (
              <div className="edit-actions">
                <button className="save-button" onClick={handleSave}>Save Changes</button>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;