import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import './Order.css';

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const data = await menuService.getAllMenuItems();
      setMenuItems(data || []); // Provide empty array as fallback
      const initialQuantities = (data || []).reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: 1,
        }),
        {}
      );
      setItemQuantities(initialQuantities);
    } catch (err) {
      setError('Failed to fetch menu items');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    setItemQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, value),
    }));
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + itemQuantities[item.id] }
            : cartItem
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        { ...item, quantity: itemQuantities[item.id] },
      ]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-page">
      <section className="order-section">
        <h1>Menu</h1>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-details">
                <h3>{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <p className="menu-item-price">
                  ${(Number(item.price) || 0).toFixed(2)}
                </p>
                <div className="menu-item-actions">
                  <input
                    type="number"
                    min="1"
                    value={itemQuantities[item.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                  />
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      // ... rest of the code remains the same ...

<aside className="order-cart">
  <h2>Cart</h2>
  {cart.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    <>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span>{item.name}</span>
              <span>x {item.quantity}</span>
            </div>
            <div className="cart-item-price">
              ${((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total:</strong> ${calculateTotal()}
      </div>
      <button
        className="order-btn"
        onClick={handleOrder}
        disabled={cart.length === 0}
      >
        Order
      </button>
    </>
  )}
</aside>
    </div>
  );
};

export default Order; 