import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [submitted, setSubmitted] = useState(false);

  // Auto-fill user data when component mounts
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setFormData(prevState => ({
        ...prevState,
        name: currentUser.username || '',
        email: currentUser.email || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTimeString = `${formData.date}T${formData.time}:00`;
      
      const bookingData = {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        dateTime: dateTimeString,
        numberOfGuests: parseInt(formData.guests)
      };

      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      const data = await response.text();
      console.log('Booking saved:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save your booking. Please try again.');
    }
  };

  return (
    <div className="booking-page">
      <section className="booking-section">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <h1>Book a Table</h1>
        <p>Reserve your spot today! Fill out the form below to secure your table at our restaurant.</p>

        {submitted ? (
          <div className="confirmation-message">
            <h2>Thank You, {formData.name}!</h2>
            <p>Your table reservation has been confirmed:</p>
            <ul>
              <li><strong>Date:</strong> {formData.date}</li>
              <li><strong>Time:</strong> {formData.time}</li>
              <li><strong>Guests:</strong> {formData.guests}</li>
            </ul>
            <p>We look forward to serving you!</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled // Make it read-only
                className="auto-filled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled // Make it read-only
                className="auto-filled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select a time</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests:</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="booking-btn">Reserve Table</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Booking;