import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllStars from "./components/AllStars";
import SingleStar from "./components/SingleStar";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";

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
				{isLoggedIn ? (
					<Switch>
						{/* <Route path="/home" component={Home} /> */}
						{/* <Redirect to="/home" /> */}
						<Route exact path="/" component={Welcome} />
						<Route exact path="/stars" component={AllStars} />
						{/* <Redirect to="/stars" /> */}
						<Route exact path="/stars/:starId" component={SingleStar} />
						<Route path="*" component={NotFound} />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/" exact component={Welcome} />
						<Route exact path="/stars" component={AllStars} />
						<Route exact path="/stars/:starId" component={SingleStar} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
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
