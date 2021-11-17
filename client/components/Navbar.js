import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Login } from "./AuthForm";
import { CgProfile, CgShoppingBag } from "react-icons/cg";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    const { handleClick, isLoggedIn, username } = this.props;
    const { handleToggle } = this;
    return (
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
              <CgProfile />
              <CgShoppingBag />
              {/* <h3>Welcome, {username}</h3> */}
            </div>
          ) : (
            <div>
              <Link to="/stars">Home</Link>
              {/* The navbar will show these links before you log in */}
              {!isLoggedIn && <button onClick={handleToggle}>Sign in</button>}
              {!this.state.hidden && <Login />}
              <CgShoppingBag />
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

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
