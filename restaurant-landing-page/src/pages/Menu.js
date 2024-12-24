import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menu');
      console.log('Menu data:', response.data);
      setMenuItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu items');
      setLoading(false);
    }
  };

  const handleItemClick = () => {
    navigate('/order');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="menu-item" 
            onClick={handleItemClick}
            role="button"
            tabIndex={0}
          >
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                className="menu-item-image"
              />
            )}
            <div className="menu-item-content">
              <h3>{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              <p className="menu-item-price">${Number(item.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;