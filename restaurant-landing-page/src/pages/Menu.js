import React from 'react';
import { useNavigate } from 'react-router-dom';
import menuItems from './MenuData'; // Import shared menu data
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  // Group menu items by category
  const categorizedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleItemClick = (item) => {
    navigate('/order', { state: { item } });
  };

  return (
    <div className="menu-container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>Our Menu</h2>
      <p className="menu-description">
        Explore our delicious offerings, crafted with love and the finest ingredients!
      </p>
      {Object.entries(categorizedItems).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="menu-items">
            {items.map((item) => (
              <div key={item.id} className="menu-item" onClick={() => handleItemClick(item)}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
