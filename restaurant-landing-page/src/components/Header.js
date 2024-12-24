import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { authService } from '../services/authService';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicking outside of menu area
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      // Close user menu if clicking outside of user menu area
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/profile');
  };

  return (
    <header className="header">
      <nav className="nav" ref={menuRef}>
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
        The Coastal Bite
        </Link>
        
        <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars />
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
          {currentUser ? (
            <li className="user-menu-container" ref={userMenuRef}>
              <button 
                className="user-menu-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FaUser /> {currentUser.username}
              </button>
              {isUserMenuOpen && (
                <div className="user-menu">
                  <button 
                    className="profile-link"
                    onClick={handleProfileClick}
                  >
                    <FaUser /> Profile
                  </button>
                  <button 
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <FaUser /> Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;