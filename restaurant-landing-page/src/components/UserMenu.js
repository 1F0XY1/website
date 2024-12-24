import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './UserMenu.css';

const UserMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
        window.location.reload(); // Refresh to update the navbar
    };

    return (
        <div className="user-menu">
            <button 
                className="user-menu-button" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {user.name || user.email}
            </button>
            
            {isOpen && (
                <div className="user-menu-dropdown">
                    <div className="user-info">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                    </div>
                    <div className="user-menu-items">
                        <button onClick={() => navigate('/profile')}>Profile</button>
                        <button onClick={() => navigate('/my-bookings')}>My Bookings</button>
                        <button onClick={() => navigate('/my-orders')}>My Orders</button>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu; 