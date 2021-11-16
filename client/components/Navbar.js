import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Login, Signup } from "./AuthForm";

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
    const { handleClick, isLoggedIn } = this.props;
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
              <h3>Welcome, {username}</h3>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <button onClick={handleToggle}>Sign in</button>
              {!this.state.hidden && <Login />}
              {/* <div className="hidden">
                <Login />
              </div> */}

              {/* <Signup /> */}
              {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}
// const Navbar = ({ handleClick, isLoggedIn, username }) => (
//   <div>
//     <h1>ASTRO MART</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/stars">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//           <h3>Welcome, {username}</h3>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <button onClick={() => toggleSignIn()}>Sign in</button>
//           <div className="hidden">
//             <Login />
//           </div>

//           {/* <Signup /> */}
//           {/* <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link> */}
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// );

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
