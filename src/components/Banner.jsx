import React from 'react';
import './Banner.css';
import spacexhero from './Assets/spacex_hero.jpg'


const Banner = () => {
  return (
    <header className="banner">
      <div className="container">
        <div className="left-column">
          <h1>Welcome to SpaceX Crew</h1>
          <p>Exploring the Universe Together</p>
          <a href="https:///spacex.com" className="button">Learn More</a>
        </div>
        <div className="right-column">
          <img src={spacexhero} alt="SpaceX" />
        </div>
      </div>
    </header>
  );
};

export default Banner;
