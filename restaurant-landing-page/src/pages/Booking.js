import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                max="20"
                value={formData.guests}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="booking-btn">Reserve Table</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Booking;
