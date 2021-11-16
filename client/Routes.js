import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { me } from "./store";
import AllStars from "./components/AllStars";
import SingleStar from "./components/SingleStarView";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Navbar />
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/stars" component={AllStars} />
            {/* <Redirect to="/stars" /> */}

            <Route path="/stars/:id" component={SingleStar} />
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/stars" component={AllStars} />
            <Route path="/stars/:id" component={SingleStar} />
            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
