import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <h5 className="site-description">Example website description</h5>
      <div className="welcome-bttn">
      <Link className="bttn-text" to="/stars">Get started</Link>
      </div>
    </div>
  );
};

export default Welcome;
