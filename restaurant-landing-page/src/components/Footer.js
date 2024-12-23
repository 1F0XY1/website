import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';  // Social media icons from react-icons
import './Footer.css';  // Add your CSS styling

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p>Address, City, Country | Phone: +1234567890 | Email: contact@restaurant.com</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} color="#ecf0f1" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} color="#ecf0f1" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} color="#ecf0f1" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Restaurant Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
