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
    const style = {marginRight: "100px", cursor:"pointer"}
    return (
      <div>
        <nav>
        <h1 className="name-navbar">ASTRO MART</h1>
          <Link className="nav-link" to="/stars">Home</Link>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              {/* <a href="#" onClick={handleClick}>
                Logout
              </a>
              <CgProfile /> */}

              <CgProfile onClick={handleToggle} size="22"/>
              {this.state.hidden && <div className ="profile-wrapper"><p className="option">{`Hello, ${username}`}</p><a className="logout option" href="#" onClick={handleClick}>
                Logout
              </a></div>}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              {/* {!isLoggedIn && <button className="nav-link" onClick={handleToggle}>Sign in</button>} */}

              {!isLoggedIn && <div className="nav-link" onClick={handleToggle}>Sign in</div>}
              {!this.state.hidden && <Login />}
            </div>
          )}
          <CgShoppingBag style={style} size="22"/>
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
