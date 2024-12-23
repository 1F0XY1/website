import React, { useRef, useEffect } from 'react';
import './About.css';

const About = () => {
  const galleryRef = useRef(null);

  // Adjust image styles dynamically based on scroll position
  const handleScroll = () => {
    const gallery = galleryRef.current;
    const images = gallery.querySelectorAll('img');
    const galleryCenter = gallery.offsetWidth / 2;

    images.forEach((image) => {
      const imageCenter = image.offsetLeft + image.offsetWidth / 2 - gallery.scrollLeft;
      const distanceFromCenter = Math.abs(galleryCenter - imageCenter);
      const maxScaleDistance = gallery.offsetWidth * 0.1; // Scaling starts within 10% of gallery width

      if (distanceFromCenter < maxScaleDistance) {
        const scaleAmount = 1 + (1 - distanceFromCenter / maxScaleDistance) * 0.1; // Maximum scale is 1.1
        image.style.transform = `scale(${scaleAmount})`;
      } else {
        image.style.transform = 'scale(1)';
      }
    });
  };

  const scrollLeft = () => {
    galleryRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    galleryRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    gallery.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial setup
    return () => gallery.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
      <br />
      <br />
      <br />
      <br />
      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <h1>About Us</h1>
          <p className="about-description">
            Welcome to The Coastal Bite, where we offer a blend of authentic flavors and a unique dining experience.
            Our restaurant brings together traditional recipes with a modern twist, creating an unforgettable atmosphere.
            Whether you're looking for a cozy meal with friends or a special dining experience, we have something for
            everyone.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            At The Coastal Bite, our mission is to provide high-quality, delicious food with exceptional service that
            makes every dining experience memorable. We aim to bring people together through great food and create a
            welcoming environment for all our guests.
          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            Our vision is to become a leading restaurant known for its innovation, quality, and exceptional customer
            service. We strive to continuously improve and evolve, maintaining our commitment to excellence.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-container">
          <h2>Our Gallery</h2>
          <button className="scroll-btn left" onClick={scrollLeft}>
            &lt;
          </button>
          <div className="gallery-images" ref={galleryRef}>
            <img src="https://media.cnn.com/api/v1/images/stellar/prod/170302153529-garlic-crab.jpg?q=w_1110,c_fill/f_webp" alt="Delicious Dish 1" />
            <img src="https://quark-studio.com/wp-content/uploads/2023/01/Shisha-1_1280X960.jpg" alt="Restaurant Interior" />
            <img src="https://bimpos.com/sites/default/files/images/posts/hapy_guests_at_restaurant.jpeg" alt="Happy Customers" />
            <img src="https://pischanrestaurant.com/wp-content/uploads/2022/11/celebrations-privite-events.jpg" alt="Special Event" />
            <img src="https://img.freepik.com/premium-photo/chef-presenting-signature-dish-trendy-restaurant-highlighting-culinary-craftsmanship_1213709-8484.jpg?w=1060" alt="Signature Dish" />
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
