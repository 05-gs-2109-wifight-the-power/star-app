import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GrNext } from "react-icons/gr";

export default class NotFound extends Component {
  render() {
    return (
      <div className="backgroundImg" >
        <div className="ntFound-content" style={{ textAlign: "center" }}>
          <h1 className="not-found-header">Oh No, Star Not Found!</h1>
          <h3 className="not-found-description">Looks like this Star has not been discovered yet.</h3>
          <Link to="/stars">
            <h2 className="backLink">
              <GrNext /> Back to the Stars
            </h2>
          </Link>
        </div>
      </div>
    );
  }
}
