import React from 'react';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner sixteen wide column">
      <div className="container">
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>Share Workouts. Be Inspired.</p>
      </div>
    </div>
  );
};

export default Banner;
