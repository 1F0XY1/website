import React, { useState } from 'react';
import menuItems from './MenuData'; // Import shared menu data
import './Order.css';

const Order = () => {
  const [cart, setCart] = useState([]);
  const [itemQuantities, setItemQuantities] = useState(
    menuItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

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

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleOrder = () => {
    alert(`Order placed for ${cart.length} items. Total: $${calculateTotal()}`);
    setCart([]);
  };

  return (
    <div className="order-page">
      <section className="order-section">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <h1>Order Online</h1>
        <p className="order-description">
          Place your order online for fast delivery. Choose your favorite food from the menu below and we will deliver it to your doorstep.
        </p>

        <div className="menu">
          <h2>Menu</h2>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)}
                <div className="menu-item-actions">
                  <input
                    type="number"
                    min="1"
                    value={itemQuantities[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                  />
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="order-cart">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <h2>Your Order</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} (${(item.price * item.quantity).toFixed(2)})
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
        <button
          className="order-btn"
          onClick={handleOrder}
          disabled={cart.length === 0}
        >
          Place Order
        </button>
      </aside>
    </div>
  );
};

export default Order;
