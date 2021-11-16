import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Login, Signup } from "./AuthForm";

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <h1>ASTRO MART</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/stars">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <h3>Welcome, {username}</h3>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link>Sign in</Link>
          <Login />
          {/* <Signup /> */}
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
