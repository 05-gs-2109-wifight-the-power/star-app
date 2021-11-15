import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>ASTRO MART</h1>
      <h5>Example website description</h5>
      <Link to="/stars">Get started</Link>
      {/* <button type="button">Get started</button> */}
    </div>
  );
};

export default Welcome;
