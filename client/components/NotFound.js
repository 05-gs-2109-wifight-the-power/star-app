import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className="backgroundImg">
        <div className="notFound">404</div>
        <div className="ntFound-content" style={{ textAlign: "center" }}>
          <h1>Oh No, Star Not Found!</h1>
          <h3>Looks like this star has not been discovered yet.</h3>
          <Link>
            <h2 className="backLink">--{">"} Back to the stars</h2>
          </Link>
        </div>
      </div>
    );
  }
}

/**
-------NOT FOUND 404 STYLE------------
.backLink {
  margin-top: 20px;
}

.ntFound-content {
  text-align: center;
}

.notFound {
color: #fff;
font-size: 12em;
font-weight: bold;
font-family: Helvetica;
text-shadow: 
  0 1px 0 #ccc, 
  0 2px 0 #c9c9c9, 
  0 3px 0 #bbb, 
  0 4px 0 #b9b9b9, 
  0 5px 0 #aaa, 
  0 6px 1px rgba(0,0,0), 
  0 0 5px rgba(0,0,0), 
  0 1px 3px rgba(0,0,0), 
  0 3px 5px rgba(0,0,0), 
  0 5px 10px rgba(0,0,0,.25), 
  0 10px 10px rgba(0,0,0,.2), 
  0 20px 20px rgba(0,0,0,.15);
}

.notFound {
  text-align: center;
}
.backgroundImg {
  background-image: url("https://i.pinimg.com/736x/09/60/dd/0960dd6c10f700fe4cda79a54112da38.jpg");
} or
.backgroundImg {
  background-image: url("not-found-background.png");
}
 */
