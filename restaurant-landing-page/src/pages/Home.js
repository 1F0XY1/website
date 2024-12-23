import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure you have your CSS styling

const Home = () => {
  return (
    <div className="home">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to Our Restaurant</h1>
        <p>Experience the finest dishes made with fresh ingredients and love. Come and taste the best of what we offer!</p>
        <Link to="/menu">
          <button className="cta-button">View Menu</button>
        </Link>
      </section>

      {/* Popular Menu Items Section */}
      <section className="popular-menu">
        <h2>Our Top-3 Popular Dishes</h2>
        <div className="menu-items">
          <Link to="/menu" className="menu-item">
            <img
              src="https://www.bhf.org.uk/-/media/images/information-support/heart-matters/heart-matters/opengraph-images-2018/piri-piri-chicken-620x400.jpg?rev=c50d800fca5543aab7ae5004902b89aa&hash=5ED3B25575A057DB32103A4FEFCDB9A4"
              alt="Piri-piri Chicken"
            />
            <h3>Piri-piri Chicken</h3>
            <p>
              Piri-piri chicken, a flavorful blend of African and Portuguese traditions, is simple to make with common herbs and spices. Roast it in the oven or grill it for a smoky twist.
            </p>
          </Link>
          <Link to="/menu" className="menu-item">
            <img
              src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/10/4/1/FN_chain-restaurant-entrees_Applebees_Bourbon-Street-Chicken-Shrimp_s6x4.jpg.rend.hgtvcom.791.527.85.suffix/1538685780055.webp"
              alt="Red Lobster: Ultimate Feast"
            />
            <h3>Red Lobster: Ultimate Feast</h3>
            <p>
              Indulge in the iconic Cheddar Bay Biscuits and stay for the Ultimate Feast, a platter of Maine lobster tail, snow crab legs, garlic shrimp scampi, and golden fried shrimp. Enjoy it all with included salad, coleslaw, and biscuits!
            </p>
          </Link>
          <Link to="/menu" className="menu-item">
            <img
              src="https://www.thespruceeats.com/thmb/9vUYEOpsHKbCDpOwFDrXHdtErYc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pistachio-crusted-rack-of-lamb-recipe-101496-hero-01-24fa40136d874c689c2cd9a19ea4f5ff.jpg"
              alt="Roasted Rack of Lamb"
            />
            <h3>Roasted Rack of Lamb</h3>
            <p>
              Have your butcher French a lamb rib roast for an elegant rack of lamb. Pan-sear it, coat with Dijon, herbs, and breadcrumbs, then roast until perfectly tender for a memorable centerpiece dish.
            </p>
          </Link>
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="promo-banner">
        <h2>Special Offer for Food Order</h2>
        <p>Enjoy a 10% discount on your first order! Use code "WELCOME10" when you order online.</p>
        <Link to="/order">
          <button className="cta-button">Order Now</button>
        </Link>
      </section>
      <br></br>
      {/* Call-to-Action (CTA) Section */}
      <section className="cta-section">
        <h2>Book a Table</h2>
        <p>Reserve your spot today or order your meal online for a quick and easy experience.</p>
        <Link to="/booking">
          <button className="cta-button">Book a Table</button>
        </Link>
      </section>
      <br></br>
    </div>
  );
};

export default Home;
