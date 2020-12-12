import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <main className="about-me-container">
      <div className="about-me__image-container">
        <img className="about-me-image" src="https://trello-attachments.s3.amazonaws.com/5fc0f7845fca4370bc8c6bca/5fc759f5e328624c65261bc2/f0e93e21e3dfb95208c0a535471e945d/Daria.jpeg" alt="" />
      </div>
      <div className="about-me-text-container">
        <h1>About Me</h1>
        <p className="about-me-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui
          .
        </p>
        <p className="about-me-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui
          .
        </p>
      </div>
    </main>
  );
}
export default AboutMe;
