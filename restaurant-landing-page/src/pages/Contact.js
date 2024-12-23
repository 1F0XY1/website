import React, { useState } from 'react';
import './Contact.css'; // Add your custom styling for the Contact page

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend or email)
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <section className="contact-section">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p className="contact-description">
            Have any questions or want to make a reservation? Reach out to us through the form below, or contact us directly.
          </p>
          
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Our Location</h2>
            <p>Address: [Restaurant Address]</p>
            <p>Phone: +1234567890</p>
            <p>Email: contact@restaurant.com</p>
            {/* Optionally, you can embed a map here */}
            <div className="map-container">
            <iframe width="691" height="539" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=691&amp;height=539&amp;hl=en&amp;q=KG,%20Karakol%20Karakol+(The%20Coastal%20Bite)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://hauckautoren.de/schreiben-einer-doktorarbeit-dissertation'>Dissertation Ghostwriting</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=3ae0c596ec575dc1a3e0fd55d193e9679143318e'></script>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
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
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
