import React from 'react';
import './styles.css'; 

function LandingPage() {
  return (
    <div className="hero">
      <div className="nav-bar">
        <div className="nav-link">
          <ul>
            <a href="#"><li>Home</li></a>
            <a href="#"><li>Inventory</li></a>
            <a href="#"><li>Shopping List</li></a>
            <a href="#"><li>Impact</li></a>
          </ul>
          <button type="button" className="btn">Log In</button>
        </div>
      </div>

      <div className="banner-title">
        <h1>Waste<span className="green-text">Less</span></h1>
        <h3>Minimizing Waste, Maximizing Impact</h3>
      </div>

      <div className="utilities">
        <h3>UTILITIES</h3>
        <h1>Getting Started</h1>
        <div className="cards-container">
          <div className="card">
            <h4>INVENTORY</h4>
            <p>Keep track of items in your kitchen & explore your cooking options</p>
          </div>
          <div className="card">
            <h4>SHOPPING LIST</h4>
            <p>Check off items as you shop & instantly update your inventory</p>
          </div>
          <div className="card">
            <h4>IMPACT</h4>
            <p>Monitor how your choices impact your life and the environment</p>
          </div>
        </div>
      </div>

      <div className="foodbank">
        <h3>DONATE</h3>
        <h1>Changed Your Mind?</h1>

        <div className="searchbox">
          <input type="text" placeholder="Enter Your Postcode" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
